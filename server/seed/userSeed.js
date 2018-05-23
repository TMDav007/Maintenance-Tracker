
// seed data
const userQuery = `

        DROP TABLE IF EXISTS users;
        DROP TYPE IF EXISTS status;
        DROP EXTENSION IF EXISTS pgcrypto;
        CREATE EXTENSION pgcrypto;
        CREATE TYPE status as ENUM ('admin','user');
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR (50) NOT NULL,
            last_name VARCHAR (50) NOT NULL,
            phone_number VARCHAR (20) NOT NULL,
            email VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR (150) NOT NULL,
            user_role status DEFAULT 'user'
        );
        INSERT INTO users (
          first_name,
          last_name,
          phone_number,
          email,
          password,
          user_role
        )
        VALUES (
          'Opemipo',
          'Samsons',
          '08012373237',
          'opemipo@yahoo.com',
          crypt('${process.env.pass3}', gen_salt('${process.env.KEY}', 5)),
          'admin'
        );
        INSERT INTO users (
          first_name,
          last_name,
          phone_number,
          email,
          password
        )
        VALUES (
          'Abrahams',
          'Lincons',
          '08033556622',
          'abraham@yahoo.com',
          crypt('${process.env.pass1}', gen_salt('${process.env.KEY}', 5))
        );

        INSERT INTO users (
          first_name,
          last_name,
          phone_number,
          email,
          password
        )
        VALUES (
          'lukas',
          'JohnSnows',
          '08033556677',
          'lukas@yahoo.com',
          crypt('${process.env.pass1}', gen_salt('${process.env.KEY}', 5))
        );
    `;

export default {
  userQuery
};
