# English Grammar Studio — B2+ (ECAES)

Página única de repaso de inglés B2–C1: gramática, escritura, lecturas y simulacros tipo ECAES.

## Ver en local

Abre `index.html` en el navegador, o:

```bash
npx serve -l 8765 .
```

## Publicar en Firebase (recomendado)

Proyecto Firebase: **yuwe-ai** · sitio: **ingles-grammar-b2**  
URL pública: **https://ingles-grammar-b2.web.app**

(No uses `yuwe-ai.web.app` — ese dominio es la app principal Yuwe AI.)

```bash
cd ingles-b2
firebase deploy --only hosting
```

Solo se publica `index.html` (los archivos `.mjs` y fuentes de datos son para editar en local).

## Flujo con GitHub

1. Haz cambios en `index.html` (o regenera con `node build-one-page.mjs` si usas los archivos extra).
2. Commit y push:

```bash
git add index.html
git commit -m "Actualiza contenido"
git push
```

3. Despliega:

```bash
firebase deploy --only hosting
```

**Despliegue automático (opcional):** en [Firebase Console](https://console.firebase.google.com/project/yuwe-ai/hosting) puedes conectar el repo de GitHub para que cada `git push` publique solo.

## Mantenimiento del banco de preguntas

- Edita `ultra-bank.js` y vuelve a inyectar:  
  `node -e "const fs=require('fs');const u=require('./ultra-bank.js');let h=fs.readFileSync('index.html','utf8');const s=h.indexOf('const ULTRA_BANK=');const e=h.indexOf(';\n\n    function getMasterExamBank()',s);h=h.slice(0,s)+'const ULTRA_BANK='+JSON.stringify(u)+h.slice(e);fs.writeFileSync('index.html',h);"`
