import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryModel } from 'src/app/interfaces/category';
import { SubCategoryModel } from 'src/app/interfaces/subcategory';

@Injectable({
  providedIn: 'root',
})
export class CategoriesSubcatgoriesService {
  private categories = new BehaviorSubject<CategoryModel[]>(
    [] as CategoryModel[]
  );
  categories$ = this.categories.asObservable();
  private subCategories = new BehaviorSubject<SubCategoryModel[]>(
    [] as SubCategoryModel[]
  );
  subCategories$ = this.subCategories.asObservable();

  constructor() {}

  setCategories(newCategories: CategoryModel[]) {
    this.categories.next(newCategories);
  }

  setSubCategories(newSubCategories: SubCategoryModel[]) {
    this.subCategories.next(newSubCategories);
  }
}
