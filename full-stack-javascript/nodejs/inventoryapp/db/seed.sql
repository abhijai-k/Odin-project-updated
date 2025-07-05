DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO categories (name, description) VALUES
('Electronics', 'Gadgets and devices'),
('Furniture', 'Home and office furniture');

INSERT INTO items (name, description, quantity, category_id) VALUES
('Laptop', '14-inch lightweight laptop', 5, 1),
('Desk', 'Wooden desk', 2, 2);
