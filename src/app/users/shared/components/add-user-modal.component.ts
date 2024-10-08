import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, ModalService } from '@my/shared/ui';
import { User, usersQuery } from '@my/users/data';

@Component({
  selector: 'ui-add-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="flex flex-col bg-base-100 p-8" [formGroup]="usersFormGroup">
      <h1 class="mb-2 text-2xl font-semibold">Add a new user</h1>
      <p class="mb-6 text-sm text-gray-500">
        Here you can add a new user to the system
      </p>

      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-2">
          <label class="mb-1 block text-sm font-medium text-gray-700" for="name"
            >Name</label
          >
          <input
            id="name"
            type="text"
            class="input input-bordered input-primary w-full"
            placeholder="Full Name"
            formControlName="name"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="age"
            >Age</label
          >
          <input
            id="age"
            type="number"
            class="input input-bordered input-primary w-full"
            placeholder="Age"
            formControlName="age"
          />
        </div>

        <div>
          <label
            class="mb-1 block text-sm font-medium text-gray-700"
            for="email"
            >Email</label
          >
          <input
            id="email"
            type="email"
            class="input input-bordered input-primary w-full"
            placeholder="Email Address"
            formControlName="email"
          />
        </div>
        <div class="col-span-2">
          <label
            class="mb-1 block text-sm font-medium text-gray-700"
            for="company"
            >Company</label
          >
          <input
            id="company"
            type="text"
            class="input input-bordered input-primary w-full"
            placeholder="Company Name"
            formControlName="company"
          />
        </div>

        <div>
          <label
            class="mb-1 block text-sm font-medium text-gray-700"
            for="title"
            >Title</label
          >
          <input
            id="title"
            type="text"
            class="input input-bordered input-primary w-full"
            placeholder="Job Title"
            formControlName="title"
          />
        </div>

        <div>
          <label
            class="mb-1 block text-sm font-medium text-gray-700"
            for="department"
            >Department</label
          >
          <input
            id="department"
            type="text"
            class="input input-bordered input-primary w-full"
            placeholder="Department"
            formControlName="department"
          />
        </div>
      </div>

      <div class="mt-8 flex justify-end gap-2">
        <ui-button type="secondary" (click)="onCancel()">Cancel</ui-button>
        <ui-button [disabled]="!usersFormGroup.valid" (click)="onSaveUser()"
          >Save</ui-button
        >
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserModalComponent {
  #modalService = inject(ModalService);
  #fb = inject(FormBuilder);

  addMutation = usersQuery.add();

  usersFormGroup = this.#fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required]],
    title: ['', [Validators.required]],
    department: ['', [Validators.required]],
  });

  public onSaveUser() {
    if (this.usersFormGroup === undefined || this.usersFormGroup.invalid) {
      return;
    }

    const { name, age, email, company, title, department } =
      this.usersFormGroup.value;
    if (!name || !age || !email || !company || !title || !department) return;

    const user = {
      name,
      age,
      email,
      company,
      title,
      department,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as User;

    this.addMutation.mutate(user);
    this.#modalService.close();
    this.#modalService.close();
  }

  onCancel() {
    this.#modalService.close();
  }
}
