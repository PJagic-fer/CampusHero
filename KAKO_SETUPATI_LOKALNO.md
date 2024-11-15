# Brzinski guide kako setupati lokalno

Stvari u `{}` treba zamjeniti sa vrijednostima iz paze podataka!

## Setup postgres baze
1. skini postgres
2. restartaj pc
3. pokreni terminal window
4. `psql --username postgres -h localhost`
5. `create user {tvoj_username} with encrypted password '{tvoj_password}';`
6. `create database {ime_baze};`
7. `grant all privileges on database {ime_baze} to {tvoj_username};`
8. `\c {ime_baze}`
9. `grant all on schema public to {tvoj_username}`
10. `exit;`
11. `psql --username {tvoj_username} -h localhost -d {ime_baze}`
12. `\i {put_do_projekta}/BazaCampusHero.sql`
13. `exit;`

## Setup env varijali
1. pokreni terminal window
2. pisi komande (npr: `export POSTGRES_DB=campushero`), na **WINDOWSU** umjesto `export` koristiti `set`!
3. `export POSTGRES_USER={tvoj_username}`
4. `export POSTGRES_PASSWORD={tvoj_password}`
5. `export POSTGRES_DB={ime_baze}`

## Pokretanje backenda
1. pokreni terminal window
2. odi u backend folder
3. `./mvnw clean spring-boot:run`
