# Calculadora web

Calculadora responsiva construida con HTML, CSS y JavaScript sin librerías externas.

## Cómo abrirla

1. Descarga o descomprime los archivos del proyecto.
2. Abre `index.html` en un navegador web.
3. Haz clic en los botones o utiliza el teclado.

## Funciones

- Suma, resta, multiplicación y división.
- Números decimales.
- Botón para borrar todo y otro para borrar el último dígito.
- Operaciones con teclado: números, `+`, `-`, `*`, `/`, `Enter`, `Backspace` y `Escape`.
- Mensaje de error al intentar dividir para cero.
- Interfaz adaptable a pantallas pequeñas.

## Archivos

- `index.html`: estructura y botones de la calculadora.
- `style.css`: colores, distribución y adaptación a móvil.
- `script.js`: eventos, operaciones y actualización de la pantalla.

## Publicar en GitHub

1. Inicia sesión en GitHub y crea un repositorio nuevo llamado `calculadora-web`.
2. En el repositorio, selecciona **Add file → Upload files**.
3. Sube `index.html`, `style.css`, `script.js` y `README.md` (no subas la carpeta contenedora).
4. Selecciona **Commit changes** para guardar los archivos.
5. Para obtener un enlace público, entra a **Settings → Pages**, selecciona la rama `main` y la carpeta `/ (root)`, y guarda. GitHub mostrará el enlace del sitio cuando termine de publicarlo.

## Explicación breve para la exposición

El HTML organiza la pantalla y los botones. El CSS define la apariencia y hace que la interfaz se adapte a distintos tamaños. JavaScript escucha los clics y las teclas, guarda el número y el operador seleccionados, realiza el cálculo y muestra el resultado. La función `calculate` contiene las cuatro operaciones y `showError` controla la división para cero.
