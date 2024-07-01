import { k as createComponent, l as renderTemplate, m as maybeRenderHead, q as renderHead, p as renderComponent, t as renderSlot, o as createAstro } from './astro/server_CLKuWER9.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

// src/data/products.js
const products = [
    {
        id: "product1",
        title: "Nike Air MX Super 2500 - Red",
        description: "Descripción del producto",
        imgSrc: "/product1.jpg",
        price: "6.990",
        oldPrice: "10.990"
    },
    {
        id: "product2",
        title: "Nike Air MX Super 2500 - Blue",
        description: "Descripción del producto",
        imgSrc: "/product1.jpg",
        price: "8.990",
        oldPrice: "14.990"
    },
    {
        id: "product2",
        title: "Nike Air MX Super 2500 - Blue",
        description: "Descripción del producto",
        imgSrc: "/product1.jpg",
        price: "8.990",
        oldPrice: "14.990"
    },
    // Añadir más productos según sea necesario
];

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="bg-gray-800"> <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"> <div class="relative flex h-16 items-center justify-between"> <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"> <!-- Mobile menu button--> <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"> <span class="absolute -inset-0.5"></span> <span class="sr-only">Open main menu</span> <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path> </svg> <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"> <div class="flex flex-shrink-0 items-center"> <img class="h-8 w-auto" src="/img1.jpg" alt="Your Company"> </div> <div class="hidden sm:ml-6 sm:block"> <div class="flex space-x-[100px]"> <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> <a href="/" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">KAISA</a> <a href="/" class="rounded-md px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition duration-700">Mujer</a> <a href="/" class="rounded-md px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition duration-700">Hombre</a> <a href="/" class="rounded-md px-12 py-2 text-sm font-medium text-white hover:bg-white hover:text-black transition duration-700">Niños</a> </div> </div> </div> <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"> <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"> <span class="absolute -inset-1.5"></span> <span class="sr-only">View notifications</span> <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path> </svg> </button> <div class="flex items-center"> <a href="/cart" class="text-white hover:text-gray-900 transition duration-300 snipcart-checkout"> <i class="fas fa-shopping-cart"></i> <span class="ml-2">Carro</span> <span class="snipcart-items-count"></span> <span class="snipcart-total-price"></span> </a> <a href="/account" class="text-white hover:text-gray-900 transition duration-300 ml-4"> <i class="fas fa-user"></i> <span class="ml-2">Cuenta</span> </a> </div> </div> </div> </div> <!-- Mobile menu, show/hide based on menu state. --> <!-- menor que 740 deben esconderse  --> <div class="sm:hidden" id="mobile-menu transition "> <div class="space-y-1 px-2 pb-3 pt-2"> <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</a> <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Projects</a> <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Calendar</a> </div> </div> </nav>`;
}, "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-gray-200 py-12"> <div class="container mx-auto flex flex-wrap justify-center"> <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"> <h5 class="text-lg font-bold text-gray-800">Nosotros</h5> <ul class="list-none mb-4"> <li class="mb-2"> <a href="/about" class="text-gray-600 hover:text-gray-900 transition duration-300">Nuestra historia</a> </li> <li class="mb-2"> <a href="/team" class="text-gray-600 hover:text-gray-900 transition duration-300">Nuestro equipo</a> </li> <li> <a href="/careers" class="text-gray-600 hover:text-gray-900 transition duration-300">Historia</a> </li> </ul> </div> <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"> <h5 class="text-lg font-bold text-gray-800">Ayuda y Soporte</h5> <ul class="list-none mb-4"> <li class="mb-2"> <a href="/faq" class="text-gray-600 hover:text-gray-900 transition duration-300">FAQs</a> </li> <li class="mb-2"> <a href="/contact" class="text-gray-600 hover:text-gray-900 transition duration-300">Contactos</a> </li> <li> <a href="/returns" class="text-gray-600 hover:text-gray-900 transition duration-300">Devoluciones & Rembolso</a> </li> </ul> </div> <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"> <h5 class="text-lg font-bold text-gray-800">Redes Sociales</h5> <ul class="list-none mb-4"> <li class="mb-2"> <a href="https://www.facebook.com/" class="text-gray-600 hover:text-gray-900 transition duration-300"> <i class="fab fa-facebook-f"></i> Facebook
</a> </li> <li class="mb-2"> <a href="https://www.instagram.com/" class="text-gray-600 hover:text-gray-900 transition duration-300"> <i class="fab fa-instagram"></i> Instagram
</a> </li> <li> <a href="https://twitter.com/" class="text-gray-600 hover:text-gray-900 transition duration-300"> <i class="fab fa-twitter"></i> Twitter
</a> </li> </ul> </div> </div> <p class="text-center text-gray-600">© 2023 Kaisa. All rights reserved.</p> </footer>`;
}, "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/img1.jpg"><title>${title}</title>${renderHead()}</head> <body class="bg-white dark:bg-gray-900"> ${renderComponent($$result, "Navbar", $$Navbar, {})} <main class="mx-auto px-4 mb-14"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})}  </body> </html> `;
}, "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/layouts/Layout.astro", void 0);

export { $$Layout as $, products as p };
