import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'ui-search-input',
  standalone: true,
  imports: [],
  template: `
    <label
      class="flex gap-2 items-center input input-bordered"
      style="width: 1000px; "
    >
      <input
        type="text"
        class="grow"
        (change)="handleSearchQueryChange($event)"
        placeholder="Search"
      />
      <svg
        class="w-4 h-4 opacity-70"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </label>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  search = output<string>();

  handleSearchQueryChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }
}
