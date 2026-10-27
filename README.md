# DeSite-CA-Landing-Page
# Origen de los contactos

El formulario incluye campos ocultos `trafficSource`, `utm_source`, `utm_medium`,
`utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`,
`landingPage` (solo ruta) y `referrer` (solo dominio). Se envian como propiedades
del JSON a la Lambda `SendEmailCA`. Su plantilla de correo, externa a este repo,
debe leer y mostrar `trafficSource` y los campos de campana deseados, escapando
los valores al insertarlos en HTML. Son datos declarados por el navegador, no
prueba verificada del origen.

Se conserva la primera entrada durante la sesion de la pestana en sessionStorage,
incluidas recargas y navegacion hacia el formulario. Una nueva campana en la misma
sesion no reemplaza la primera. Si el almacenamiento esta bloqueado, se conserva
en memoria mientras permanezca cargada la aplicacion.

Ejemplos de enlaces para las campanas:

- Facebook: `https://desiteproducts.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=fall`
- Instagram: `https://desiteproducts.com/?utm_source=instagram&utm_medium=paid_social&utm_campaign=fall`
- Google Ads: `https://desiteproducts.com/?utm_source=google&utm_medium=cpc&utm_campaign=fall`

Google Ads tambien se reconoce mediante `gclid`, `gbraid` o `wbraid`. Sin etiquetas,
se usa el dominio de referencia para Facebook, Instagram o Google. `fbclid` solo
se clasifica como `meta_unknown` si no hay otra senal que identifique la plataforma.
Sin senales, el valor es `direct_unknown`: no se puede distinguir una visita directa
de una referencia ocultada por el navegador. Otros valores son `referral`,
`other_campaign` y `unknown` (envios sin datos de atribucion).

Verificacion local: `node scripts/test-traffic-attribution.mjs`.

