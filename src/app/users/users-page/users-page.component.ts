import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { RowClickedEvent } from 'ag-grid-community';
import {
  ButtonComponent,
  DefaultOptions,
  ModalService,
  SearchInputComponent,
} from '@my/shared/ui';
import { User, usersQuery } from '@my/users/data';
import { AddUserModalComponent } from '@my/users/shared/components/add-user-modal.component';
import { columnDefs } from '@my/users/users-page/user-page.models';
import { DataViewerStore } from '../../shared/state';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AgGridModule,
    ButtonComponent,
    MatPaginator,
    SearchInputComponent,
  ],
  providers: [DataViewerStore],
  template: `
    <div class="flex h-full flex-col gap-6">
      <div class="flex items-center justify-between gap-6">
        <h1 class="text-2xl font-semibold">Users</h1>
        <ui-button type="primary" (click)="onAddUser()">Add User</ui-button>
      </div>
      <div>
        <ui-search-input (search)="onSearch($event)" />
      </div>
      <div class="">
        @if (usersQuery.isLoading()) {
          <p>Loading</p>
        }
        @if (usersQuery.isSuccess()) {
          <div>
            <ag-grid-angular
              class="ag-theme-alpine border-round"
              [rowData]="users()"
              [columnDefs]="columnDefs"
              (rowClicked)="onEditUser($event)"
              style="width: 100%; height: 500px; max-width: 1000px"
            />

            <mat-paginator
              #paginator
              aria-label="Select page"
              class="demo-paginator"
              [length]="totalItems()"
              [pageSize]="10"
              [showFirstLastButtons]="false"
              [hidePageSize]="true"
              [pageIndex]="0"
              (page)="onPageChange($event)"
            >
            </mat-paginator>
          </div>
        }
      </div>
    </div>
  `,
})
export class UsersPageComponent {
  protected readonly columnDefs = columnDefs;
  #modalService = inject(ModalService);
  #store = inject(DataViewerStore);
  usersQuery = usersQuery.page(this.#store.requestOptions);
  users = computed(() => this.usersQuery.data()?.items || ([] as Array<User>));
  totalItems = computed(() => this.usersQuery.data()?.total || 0);
  #router = inject(Router);

  onAddUser() {
    this.#modalService.open(AddUserModalComponent, DefaultOptions);
  }

  onEditUser(event: RowClickedEvent<User>) {
    if (!event.data) {
      return;
    }
    this.#router.navigate(['/users', event.data.id]);
  }

  onPageChange(pageEvent: PageEvent) {
    this.#store.setPage(pageEvent.pageIndex + 1);
  }

  onSearch(searchedText: string) {
    this.#store.setSearchQuery(searchedText);
  }
}
