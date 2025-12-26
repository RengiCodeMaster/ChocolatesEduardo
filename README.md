# Don Eduardo - Chocolates Artesanales 🍫

Tienda online exclusiva para la venta de chocolates artesanales provenientes del Valle de Monzón, Huánuco, Perú.

## 🚀 Tecnologías

*   **Frontend:** React 19, TypeScript, Vite
*   **Estilos:** Tailwind CSS, Framer Motion
*   **Backend / Base de Datos:** Supabase
*   **Routing:** React Router DOM
*   **Iconos:** Lucide React

## 🛠️ Instalación y Ejecución Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/RengiCodeMaster/ChocolatesEduardo.git
    cd don-eduarte---chocolates-artesanales
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y agrega tus credenciales de Supabase (puedes guiarte de `.env.example`):
    ```env
    VITE_SUPABASE_URL=tu_url_de_supabase
    VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
    ```

4.  **Correr el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 📦 Despliegue

Este proyecto está configurado para desplegarse fácilmente en **Vercel**.

1.  Importa el repositorio en Vercel.
2.  En la configuración del proyecto en Vercel, agrega las variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
3.  Despliega.

---
Hecho con ❤️ y Cacao del Monzón.
