# Notes App

A simple notes app built with Next.js and TypeScript, using Supabase as the database. This app is designed to be both lightweight and functional, aiming to be as easy to use as possible while still offering enough features to reflect the user's needs.


https://github.com/user-attachments/assets/665655ce-c93c-4832-b679-75aa982f747b


## Background

I frequently use a notes app on my phone, but I found some features to be either too complex or lacking essential functionality. To solve this, I decided to build my own notes app with a focus on simplicity and efficiency.

Currently, the app includes basic note-taking functionalities, but it is a work in progress with several planned features to enhance usability.

## Features

### Current Features

- Add a note
- Edit a note
- Delete a note
- Check a note (moves it to the end of the list)
- Reorder notes using drag-and-drop
- Notes are stored in context to minimize database fetches

### Planned Features

- Ability to create multiple lists
- Move items between lists
- Add details to a note
- Customizable settings:
  - What happens when checking a note (do nothing, move to end, delete immediately)
  - Should new notes be added at the beginning or end of the list
- Making the app work as progressive web app
- Color themes
- Item reminders
- Visual improvements

## Tech Stack

- Framework: Next.js (React + TypeScript)
- Database: Supabase
- Libraries:
  - react-icons for icons
  - headlessui for accessible UI components
  - dnd-kit for drag-and-drop functionality

## Installation & Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/notes-app.git
    cd notes-app
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```
3. Create a supabase account, if you don't already have one

    Read more: https://supabase.com/dashboard/sign-up


4. Create a table to the database in Supabase

    The app is currenty using table called 'notes', but obviously you can change this, if you want. 
    The table has following fields:
    - id: int8, primary (generated automatically)
    - created_at: timestamp (generated automatically)
    - name: text
    - checked: bool
    - index: int2 (generated automatically)
    - type: text (this is for the future development)


3. Set up your environment variables:

- Create a .env.local file in the root directory.
- Add your Supabase credentials:

  ```bash
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
5. Open http://localhost:3000 in your browser to view the app.

## Contribution

This project is still in development. Feel free to submit feature requests or report bugs by opening an issue.

## License

This project is licensed under the MIT License.





