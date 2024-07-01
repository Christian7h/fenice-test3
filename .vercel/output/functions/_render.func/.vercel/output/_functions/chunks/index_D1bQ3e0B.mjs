/* empty css                         */
import { k as createComponent, l as renderTemplate, m as maybeRenderHead, n as addAttribute, o as createAstro, p as renderComponent } from './astro/server_CLKuWER9.mjs';
import 'kleur/colors';
import 'html-escaper';
import { p as products, $ as $$Layout } from './Layout_GrUs3EIc.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const { id, title, body, imgSrc, price, oldPrice, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative flex flex-col w-full max-w-xs overflow-hidden border border-gray-100 bg-white shadow-xl shadow-black rounded-lg"> <a${addAttribute(url, "href")} class="relative flex mx-3 mt-3 h-60 overflow-hidden rounded-xl"> <img${addAttribute(imgSrc, "src")}${addAttribute(title, "alt")} class="object-cover w-full h-full"> </a> <div class="px-5 pb-5 mt-4"> <a${addAttribute(url, "href")}> <h5 class="text-xl tracking-tight text-slate-900">${title}</h5> </a> <div class="flex items-center justify-between mt-2 mb-5"> <p> <span class="text-3xl font-bold text-slate-900">${price}</span> ${oldPrice && renderTemplate`<span class="text-sm text-slate-900 line-through ml-2">${oldPrice}</span>`} </p> </div> <button class="flex items-center justify-center px-5 py-2.5 text-center text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 snipcart-add-item"${addAttribute(id, "data-item-id")}${addAttribute(url, "data-item-url")}${addAttribute(title, "data-item-name")}${addAttribute(price, "data-item-price")}${addAttribute(imgSrc, "data-item-image")}> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>
Agregar al carrito
</button> </div> </div>`;
}, "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/components/Card.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Inicio" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="inline-grid gap-5 mt-12 sm:grid-cols-3 lg:grid-cols-3"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "id": product.id, "url": `/producto/${product.id}`, "title": product.title, "body": product.description, "imgSrc": product.imgSrc, "price": product.price, "oldPrice": product.oldPrice })}`)} </section> ` })}`;
}, "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/pages/index.astro", void 0);

const $$file = "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
