<template>
  <div class="bg-gray-50">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog
          as="div"
          class="relative z-40 sm:hidden"
          @close="mobileFiltersOpen = false"
        >
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4">
                  <Disclosure
                    as="div"
                    v-for="section in filters"
                    :key="section.name"
                    class="border-t border-gray-200 px-4 py-6"
                    v-slot="{ open }"
                  >
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400"
                      >
                        <span class="font-medium text-gray-900">{{
                          section.name
                        }}</span>
                        <span class="ml-6 flex items-center">
                          <ChevronDownIcon
                            :class="[
                              open ? '-rotate-180' : 'rotate-0',
                              'h-5 w-5 transform',
                            ]"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-mobile-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 text-sm text-gray-500"
                            >{{ option.label }}</label
                          >
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main>
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div class="py-24 text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>
            <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
              Thoughtfully designed objects for the workspace, home, and travel.
            </p>
          </div>

          <!-- Filters -->
          <section
            aria-labelledby="filter-heading"
            class="border-t border-gray-200 pt-6"
          >
            <h2 id="filter-heading" class="sr-only">Product filters</h2>

            <div class="flex items-center justify-between">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sort
                    <ChevronDownIcon
                      class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <MenuItem
                        v-for="option in sortOptions"
                        :key="option.name"
                        v-slot="{ active }"
                      >
                        <a
                          :href="option.href"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm font-medium text-gray-900',
                          ]"
                          >{{ option.name }}</a
                        >
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>

              <button
                type="button"
                class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                @click="mobileFiltersOpen = true"
              >
                Filters
              </button>

              <PopoverGroup
                class="hidden sm:flex sm:items-baseline sm:space-x-8"
              >
                <Popover
                  as="div"
                  v-for="(section, sectionIdx) in filters"
                  :key="section.name"
                  id="menu"
                  class="relative inline-block text-left"
                >
                  <div>
                    <PopoverButton
                      class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>{{ section.name }}</span>
                      <span
                        v-if="sectionIdx === 0"
                        class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700"
                        >1</span
                      >
                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </PopoverButton>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <PopoverPanel
                      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <form class="space-y-4">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            :for="`filter-${section.id}-${optionIdx}`"
                            class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >{{ option.label }}</label
                          >
                        </div>
                      </form>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </PopoverGroup>
            </div>
          </section>

          <!-- Product grid -->
          <section aria-labelledby="products-heading" class="mt-8">
            <h2 id="products-heading" class="sr-only">Products</h2>

            <div
              class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
            >
              <nuxt-link
                v-for="product in products1"
                :key="product.id"
                to="/product"
                class="group"
              >
                <div
                  class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2"
                >
                  <img
                    :src="product.imageSrc"
                    :alt="product.imageAlt"
                    class="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div
                  class="mt-4 flex items-center justify-between text-base font-medium text-gray-900"
                >
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.price }}</p>
                </div>
                <p class="mt-1 text-sm italic text-gray-500">
                  {{ product.description }}
                </p>
              </nuxt-link>
            </div>
          </section>

          <section
            aria-labelledby="featured-heading"
            class="relative mt-16 overflow-hidden rounded-lg lg:h-96"
          >
            <div class="absolute inset-0">
              <img
                src="https://tailwindui.com/img/ecommerce-images/category-page-01-featured-collection.jpg"
                alt=""
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div aria-hidden="true" class="relative h-96 w-full lg:hidden" />
            <div aria-hidden="true" class="relative h-32 w-full lg:hidden" />
            <div
              class="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg"
            >
              <div>
                <h2 id="featured-heading" class="text-xl font-bold text-white">
                  Workspace Collection
                </h2>
                <p class="mt-1 text-sm text-gray-300">
                  Upgrade your desk with objects that keep you organized and
                  clear-minded.
                </p>
              </div>
              <a
                href="#"
                class="mt-6 flex flex-shrink-0 items-center justify-center rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                >View the collection</a
              >
            </div>
          </section>

          <section aria-labelledby="more-products-heading" class="mt-16 pb-24">
            <h2 id="more-products-heading" class="sr-only">More products</h2>

            <div
              class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
            >
              <nuxtLink
                v-for="product in products2"
                :key="product.id"
                to="/product"
                class="group"
              >
                <div
                  class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2"
                >
                  <img
                    :src="product.imageSrc"
                    :alt="product.imageAlt"
                    class="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div
                  class="mt-4 flex items-center justify-between text-base font-medium text-gray-900"
                >
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.price }}</p>
                </div>
                <p class="mt-1 text-sm italic text-gray-500">
                  {{ product.description }}
                </p>
              </nuxtLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
  import { XMarkIcon } from "@heroicons/vue/24/outline";
  import { ChevronDownIcon } from "@heroicons/vue/20/solid";

  const sortOptions = [
    { name: "Most Popular", href: "#" },
    { name: "Best Rating", href: "#" },
    { name: "Newest", href: "#" },
    { name: "Price: Low to High", href: "#" },
    { name: "Price: High to Low", href: "#" },
  ];
  const filters = [
    {
      id: "category",
      name: "Category",
      options: [
        { value: "tees", label: "Tees" },
        { value: "crewnecks", label: "Crewnecks" },
        { value: "hats", label: "Hats" },
        { value: "bundles", label: "Bundles" },
        { value: "carry", label: "Carry" },
        { value: "objects", label: "Objects" },
      ],
    },
    {
      id: "brand",
      name: "Brand",
      options: [
        { value: "clothing-company", label: "Clothing Company" },
        { value: "fashion-inc", label: "Fashion Inc." },
        { value: "shoes-n-more", label: "Shoes 'n More" },
        { value: "supplies-n-stuff", label: "Supplies 'n Stuff" },
      ],
    },
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White" },
        { value: "black", label: "Black" },
        { value: "grey", label: "Grey" },
        { value: "blue", label: "Blue" },
        { value: "olive", label: "Olive" },
        { value: "tan", label: "Tan" },
      ],
    },
    {
      id: "sizes",
      name: "Sizes",
      options: [
        { value: "xs", label: "XS" },
        { value: "s", label: "S" },
        { value: "m", label: "M" },
        { value: "l", label: "L" },
        { value: "xl", label: "XL" },
        { value: "2xl", label: "2XL" },
      ],
    },
  ];
  const products1 = [
    {
      id: 1,
      name: "Focus Paper Refill",
      href: "#",
      price: "$13",
      description: "3 sizes available",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 2,
      name: "Focus Card Holder",
      href: "#",
      price: "$64",
      description: "Walnut",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg",
      imageAlt: "Paper card sitting upright in walnut card holder on desk.",
    },
    {
      id: 3,
      name: "Focus Carry Pouch",
      href: "#",
      price: "$32",
      description: "Heather Gray",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg",
      imageAlt:
        "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
    },
    // More products...
  ];
  const products2 = [
    {
      id: 7,
      name: "Electric Kettle",
      href: "#",
      price: "$149",
      description: "Black",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-07.jpg",
      imageAlt:
        "Close up of long kettle spout pouring boiling water into pour-over coffee mug with frothy coffee.",
    },
    {
      id: 8,
      name: "Leather Workspace Pad",
      href: "#",
      price: "$165",
      description: "Black",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-08.jpg",
      imageAlt:
        "Extra large black leather workspace pad on desk with computer, wooden shelf, desk organizer, and computer peripherals.",
    },
    {
      id: 9,
      name: "Leather Long Wallet",
      href: "#",
      price: "$118",
      description: "Natural",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-09.jpg",
      imageAlt:
        "Leather long wallet held open with hand-stitched card dividers, full-length bill pocket, and simple tab closure.",
    },
    // More products...
  ];
  const mobileFiltersOpen = ref(false);
</script>
