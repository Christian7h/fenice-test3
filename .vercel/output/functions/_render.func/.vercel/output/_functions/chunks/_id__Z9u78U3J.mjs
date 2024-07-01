/* empty css                         */
import { k as createComponent, l as renderTemplate, p as renderComponent, o as createAstro, m as maybeRenderHead, n as addAttribute } from './astro/server_CLKuWER9.mjs';
import 'kleur/colors';
import 'html-escaper';
import { p as products, $ as $$Layout } from './Layout_GrUs3EIc.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Producto con ID ${id} no encontrado`);
  }
  const { title, description, imgSrc, price, oldPrice } = product;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-8 bg-gray-900 text-white md:py-16 antialiased"> <div class="container mx-auto"> <div class="grid lg:grid-cols-2 gap-8"> <div class="flex flex-col items-center justify-center h-full p-6 bg-gray-800 rounded-lg shadow-xl"> <img${addAttribute(imgSrc, "src")}${addAttribute(title, "alt")} class="object-cover w-full h-full rounded-lg"> </div> <div class="flex flex-col items-start justify-center p-6 bg-gray-800 rounded-lg shadow-xl"> <h1 class="text-3xl font-semibold">${title}</h1> <p class="text-2xl font-extrabold">${price}</p> ${oldPrice && renderTemplate`<p class="text-xl text-gray-500 line-through">${oldPrice}</p>`} <p class="mt-4">${description}</p> <button class="flex items-center justify-center px-5 py-2.5 text-center text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 snipcart-add-item mt-6"${addAttribute(id, "data-item-id")}${addAttribute(`/producto/${id}`, "data-item-url")}${addAttribute(title, "data-item-name")}${addAttribute(price, "data-item-price")}${addAttribute(imgSrc, "data-item-image")}>
Agregar al carrito
</button> </div> </div> </div> </section> ` })}`;
}, "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/pages/producto/[id].astro", void 0);

const $$file = "C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/pages/producto/[id].astro";
const $$url = "/producto/[id]";

export { $$id as default, $$file as file, $$url as url };
