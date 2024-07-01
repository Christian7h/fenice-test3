import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './astro/server_CLKuWER9.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"window.SnipcartSettings={publicApiKey:\"NjFmZmE3MmYtOWNlNy00ZGUxLTkzOWMtZWMyZGNkYzMxMmQ4NjM4NTQ3Njg5ODg1MDQxMDQy\",loadStrategy:\"on-user-interaction\",currency:\"clp\",version:\"3.7.1\",modalStyle:\"side\"};(()=>{var r;(r=window.SnipcartSettings).version!=null||(r.version=\"3.0\");var a;(a=window.SnipcartSettings).timeoutDuration!=null||(a.timeoutDuration=2750);var c;(c=window.SnipcartSettings).domain!=null||(c.domain=\"cdn.snipcart.com\");var d;(d=window.SnipcartSettings).protocol!=null||(d.protocol=\"https\");var p=window.SnipcartSettings.version.includes(\"v3.0.0-ci\")||window.SnipcartSettings.version!=\"3.0\"&&window.SnipcartSettings.version.localeCompare(\"3.4.0\",void 0,{numeric:!0,sensitivity:\"base\"})===-1,s=[\"focus\",\"mouseover\",\"touchmove\",\"scroll\",\"keydown\"];window.LoadSnipcart=i,document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",S):S();function S(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy===\"on-user-interaction\"&&(s.forEach(t=>document.addEventListener(t,i)),setTimeout(i,window.SnipcartSettings.timeoutDuration)):i()}var w=!1;function i(){if(w)return;w=!0;let t=document.getElementsByTagName(\"head\")[0],n=document.querySelector(\"#snipcart\"),o=document.querySelector(`src[src^=\"${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}\"][src$=\"snipcart.js\"]`),e=document.querySelector(`link[href^=\"${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}\"][href$=\"snipcart.css\"]`);n||(n=document.createElement(\"div\"),n.id=\"snipcart\",n.setAttribute(\"hidden\",\"true\"),document.body.appendChild(n)),l(n),o||(o=document.createElement(\"script\"),o.src=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`,o.async=!0,t.appendChild(o)),e||(e=document.createElement(\"link\"),e.rel=\"stylesheet\",e.type=\"text/css\",e.href=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`,t.prepend(e)),s.forEach(u=>document.removeEventListener(u,i))}function l(t){!p||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})();\n"}],"styles":[{"type":"external","src":"/_astro/index.DOybDO-Q.css"}],"routeData":{"route":"/producto/[id]","isIndex":false,"type":"page","pattern":"^\\/producto\\/([^/]+?)\\/?$","segments":[[{"content":"producto","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/producto/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"window.SnipcartSettings={publicApiKey:\"NjFmZmE3MmYtOWNlNy00ZGUxLTkzOWMtZWMyZGNkYzMxMmQ4NjM4NTQ3Njg5ODg1MDQxMDQy\",loadStrategy:\"on-user-interaction\",currency:\"clp\",version:\"3.7.1\",modalStyle:\"side\"};(()=>{var r;(r=window.SnipcartSettings).version!=null||(r.version=\"3.0\");var a;(a=window.SnipcartSettings).timeoutDuration!=null||(a.timeoutDuration=2750);var c;(c=window.SnipcartSettings).domain!=null||(c.domain=\"cdn.snipcart.com\");var d;(d=window.SnipcartSettings).protocol!=null||(d.protocol=\"https\");var p=window.SnipcartSettings.version.includes(\"v3.0.0-ci\")||window.SnipcartSettings.version!=\"3.0\"&&window.SnipcartSettings.version.localeCompare(\"3.4.0\",void 0,{numeric:!0,sensitivity:\"base\"})===-1,s=[\"focus\",\"mouseover\",\"touchmove\",\"scroll\",\"keydown\"];window.LoadSnipcart=i,document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",S):S();function S(){window.SnipcartSettings.loadStrategy?window.SnipcartSettings.loadStrategy===\"on-user-interaction\"&&(s.forEach(t=>document.addEventListener(t,i)),setTimeout(i,window.SnipcartSettings.timeoutDuration)):i()}var w=!1;function i(){if(w)return;w=!0;let t=document.getElementsByTagName(\"head\")[0],n=document.querySelector(\"#snipcart\"),o=document.querySelector(`src[src^=\"${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}\"][src$=\"snipcart.js\"]`),e=document.querySelector(`link[href^=\"${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}\"][href$=\"snipcart.css\"]`);n||(n=document.createElement(\"div\"),n.id=\"snipcart\",n.setAttribute(\"hidden\",\"true\"),document.body.appendChild(n)),l(n),o||(o=document.createElement(\"script\"),o.src=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.js`,o.async=!0,t.appendChild(o)),e||(e=document.createElement(\"link\"),e.rel=\"stylesheet\",e.type=\"text/css\",e.href=`${window.SnipcartSettings.protocol}://${window.SnipcartSettings.domain}/themes/v${window.SnipcartSettings.version}/default/snipcart.css`,t.prepend(e)),s.forEach(u=>document.removeEventListener(u,i))}function l(t){!p||(t.dataset.apiKey=window.SnipcartSettings.publicApiKey,window.SnipcartSettings.addProductBehavior&&(t.dataset.configAddProductBehavior=window.SnipcartSettings.addProductBehavior),window.SnipcartSettings.modalStyle&&(t.dataset.configModalStyle=window.SnipcartSettings.modalStyle),window.SnipcartSettings.currency&&(t.dataset.currency=window.SnipcartSettings.currency),window.SnipcartSettings.templatesUrl&&(t.dataset.templatesUrl=window.SnipcartSettings.templatesUrl))}})();\n"}],"styles":[{"type":"external","src":"/_astro/index.DOybDO-Q.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/crist/Desktop/astro-ecommerce-snipcart/src/pages/producto/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/producto/[id]@_@astro":"pages/producto/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/crist/Desktop/astro-ecommerce-snipcart/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/generic_jks1NhcA.mjs","/src/pages/producto/[id].astro":"chunks/_id__Z9u78U3J.mjs","/src/pages/index.astro":"chunks/index_D1bQ3e0B.mjs","\u0000@astrojs-manifest":"manifest_CFCwzkn_.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.B0EML_qM.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.DOybDO-Q.css","/favicon.svg","/img1.jpg","/product1.jpg"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest as m };
