# Headless CMS (Nextjs - Woocommerce) Project

This project aims to create a headless CMS using WordPress and WooCommerce REST APIs and develop an interface using Next.js, React, and Tailwind CSS.

## Setup Steps

### Backend Setup

1. **Install WordPress:**
   - Install and publish WordPress on localhost or a web server.
   - Install the WP-Theme folder on the wp-content/Themes directory of your WordPress site and activate it from the admin panel.

2. **Install Required Plugins:**
   - WooCommerce
   - WP-GraphQL
   - [Headless CMS](https://github.com/imranhsayed/headless-cms?tab=readme-ov-file)

3. **Create WooCommerce REST API Keys:**
   - Generate API keys from WooCommerce settings.

### Frontend Setup

4. **Project Setup:**
   - Clone the GitHub repository:

     ```
     git clone https://github.com/barisertugrul/nextjs-woocommerce-restapi-project

    - Open the frontend project in an editor and run `npm install` to install dependencies.

5. **Set Environment Variables:**
   - Configure the values in the `.env` file. (After changing the extension of the .env.example file to .env, you can add your own values.)

6. **Run the Project:**
   - Start the project using `npm run dev`.

7. **Test the Interface:**
   - Visit `http://localhost:3000` in your browser to verify the interface is working.

## Project Structure

- **WordPress Theme:** Custom WordPress theme.
- **Frontend Project:** Interface developed using Next.js, React, and Tailwind CSS.

## Contributing

If you wish to contribute, please submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
