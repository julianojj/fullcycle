package com.example.infrastructure.category;

import com.example.domain.*;
import com.example.infrastructure.category.persistence.CategoryJpaEntity;
import com.example.infrastructure.category.persistence.CategoryRepository;
import com.example.infrastructure.utils.SpeficicationUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryMySQLGateway implements CategoryGateway {

    private final CategoryRepository categoryRepository;

    public CategoryMySQLGateway(final CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category create(Category category) {
        return this.categoryRepository.
                save(CategoryJpaEntity.from(category)).
                toAggregate();
    }

    @Override
    public Optional<Category> findById(CategoryID id) {
        return this.categoryRepository.findById(id.getValue()).map(CategoryJpaEntity::toAggregate);
    }

    @Override
    public Category update(Category category) {
        return this.categoryRepository.saveAndFlush(CategoryJpaEntity.from(category)).toAggregate();
    }

    @Override
    public void deleteById(CategoryID id) {
        if(this.categoryRepository.existsById(id.getValue())) {
            this.categoryRepository.deleteById(id.getValue());
        }
    }

    @Override
    public Pagination<Category> findAll(CategorySearchQuery query) {
        var page = PageRequest.of(
                query.page(),
                query.perPage(),
                Sort.by(Sort.Direction.fromString(query.direction()), query.sort())
        );
        var specifications =  Optional.ofNullable(query.terms())
                .filter(str -> !str.isBlank())
                .map(str -> {
                    var nameLike = SpeficicationUtils.<CategoryJpaEntity>Like("name", str);
                    var descriptionLike = SpeficicationUtils.<CategoryJpaEntity>Like("description", str);
                    return nameLike.or(descriptionLike);
                })
                .orElse(null);
        var categories = this.categoryRepository.findAll(Specification.where(specifications), page);
        return new Pagination<>(
                categories.getNumber(),
                categories.getSize(),
                categories.getTotalElements(),
                categories.map(CategoryJpaEntity::toAggregate).stream().toList()
        );
    }
}
