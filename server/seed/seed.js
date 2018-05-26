
// seed data
const createAndSeed = `

        DROP TABLE IF EXISTS users CASCADE;
        DROP TYPE IF EXISTS status;
        DROP EXTENSION IF EXISTS pgcrypto;
        CREATE EXTENSION pgcrypto;
        CREATE TYPE status as ENUM ('admin','user');
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR (50) NOT NULL,
            last_name VARCHAR (50) NOT NULL,
            phone_number VARCHAR (20)UNIQUE NOT NULL,
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

    DROP TABLE IF EXISTS requests;
    DROP TYPE IF EXISTS req_status;
    CREATE TYPE req_status as ENUM ('pending','disapproved', 'processing','resolved');
    CREATE TABLE requests (
        id SERIAL PRIMARY KEY,
        request_title VARCHAR (100) NOT NULL,
        request_body TEXT NOT NULL,
        request_status req_status DEFAULT 'processing',
        date DATE NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE CASCADE
    );
    INSERT INTO requests (
      request_title,
      request_body,
      date,
      user_id
    )
    VALUES (
      'Request to fix the AC',
      'The AC stopped working some days ago, I will like it to get fixed on time. Thank you',
      '2018-09-22',
      2
    );

    INSERT INTO requests (
      request_title,
      request_body,
      request_status,
      date,
      user_id
    )
    VALUES (
      'Request to fix the Laptop',
      'The Laptop stopped working some days ago, I will like it to get fixed on time. Thank you',
      'pending',
      '2018-06-10',
      2
    );

    INSERT INTO requests (
      request_title,
      request_body,
      date,
      user_id
    )
    VALUES (
      'Request to fix the TV',
      'The Tv stopped working some days ago, I will like it to get fixed on time. Thank you',
      '2018-06-16',
      3
    );
    `;

export default {
  createAndSeed
};
