# Durangaldeko liburu denda, Liburitegi eta Mediateken mapa  // AinhizeArrese_GeolokalizazioProiektua_25-26

# EGILEA
- [Ainhize Arrese](https://github.com/arreseAinhize)

# AURKIBIDEA
- [Sarrera](#sarrera)
    - [Erabilitako Teknologiak](#erabilitako-teknologiak)
- [Instalazioa eta Konfigurazioa](#instalazioa-eta-konfigurazioa)
- [Erabilera](#erabilera)
- [Interfaze Grafikoaren Fluxua](#interfaze-grafikoaren-fluxua)
- [API Endpoints](#api-endpoints)
- [Gehigarriak](#gehigarriak)
    - [Proiektuaren Ahulguneak](#proiektuaren-ahulguneak)
    - [Etorkizuneko Hobekuntzak](#etorkizuneko-hobekuntzak)
- [Oharrak](#oharrak)

## Sarrera

Proiektu honek Durangaldeko liburu denda lokal, liburutegi zein mediatekak geolokalizatzeko web-gune bat eskaintzen du. Helburua erabiltzaileei toki ahuek erraz aurkitzeko aukera ematea da, mapa interaktibo baten bidez kokapenak bistaratuz eta informazio xehatua eskainiz. Web-guneak hizkuntza anitzeko euskarria du (euskera, ingelesa eta gaztelania), eta erabiltzaile esperientzia hobetzeko diseinu erantzule eta "gai" aldakorra (argi/ilun) barne hartzen ditu. Backend-ak API RESTful bat eskaintzen du datuak kudeatzeko, eta guztia Docker containeretan dago kapsulatuta garapen eta ekoizpen inguruneetarako erraztasuna emateko.


### Erabilitako Teknologiak

- **Frontend:**
  - HTML5 eta CSS3 diseinu erantzule eta moderno baterako.
  - JavaScript (ES6+) dinamismoa eta interaktibitatea lortzeko.
  - Bootstrap 5.3.8 (CSS eta JS) interfazea azkar eraikitzeko eta mugikorrentzako optimizatzeko.
  - MapLibre GL JS (WebGL oinarritutako mapa irekia) mapa interaktiboak sortzeko eta geolokalizazioa bistaratzeko.
  - Gai aldaketa script-ak (argi/ilun) erabiltzaile esperientzia pertsonalizatzeko.

- **Backend:**
  - Node.js (Express.js framework-arekin) zerbitzari arina eta azkarra sortzeko.
  - API RESTful datuak kudeatzeko eta frontend-arekin komunikatzeko.

- **Datu-basea:**
  - MySQL edo PostgreSQL SQL kontsultak erabiliz datuak gordetzeko eta berreskuratzeko.
  - Init.sql fitxategia datu-basea hasieratzeko.

- **Zerbitzaria eta Containerizazioa:**
  - Nginx proxy inverso gisa eta fitxategi estatikoak zerbitzatzeko.
  - Docker eta Docker Compose aplikazioa containeretan kapsulatzeko eta garapen/ekoizpen inguruneetarako erraz hedatzeko.

- **Besteak:**
  - CORS (Cross-Origin Resource Sharing) API eskaerak onartzeko.
  - Cache optimizazioa (Nginx-en bidez) errendimendua hobetzeko.

## Instalazioa eta Konfigurazioa

1. **Aurrebaldintzak:**
   - Docker eta Docker Compose instalatuta.

2. **Deskargatu proiektua:**
   ```bash
   git clone <repo-url>
   cd Paag2-Geolokalizazioa-Liburu-Denden-Proiektua
   ```

3. **Eraiki eta abiarazi kontainerrak:**
   ```bash
   docker-compose up --build
   ```

4. **Sarbidea:**
   - HTTP: `http://localhost`

## Erabilera

- Nabigatu `http://localhost` helbidera.
- Hautatu hizkuntza (euskera, ingelesa edo gaztelania).
- Erabili mapa dendak aurkitzeko eta informazioa ikusteko.
- Aldatu tema argi/ilun botoiarekin.

## Interfaze Grafikoaren Fluxua

Erabiltzaileak aplikazioan nabigatzen duen fluxua honako hau da:

1. **Hasiera orria (index.html):** Proiektuaren aurkezpena, nabigazio menua eta hizkuntza hautatzeko aukera. Erabiltzaileak hemen hasten du esplorazioa.
<img src="./Proiektuaren irudiak/Index.png">

2. **Denda orria (dendak.html):** Dendak zerrendatu eta mapa interaktiboan bistaratu. Erabiltzaileak dendak bilatu, filtroak aplikatu eta kokapenak ikus ditzake. Mapa MapLibre GL JS erabiliz dago inplementatuta, eta GeoJSON datuak backend-etik lortzen ditu.
<p><img src="./Proiektuaren irudiak/DurangaldekoDendaDanak.png"></p>
<p><img src="./Proiektuaren irudiak/DurangaldekoDendaFiltro.png"></p>

3. **Kokapena orria (kokapena.html):** Geolokalizazio xehetasunak eta mapa zabalagoa. Erabiltzaileak bere kokapena partekatu dezake eta dendetara bideak kalkulatu.
<p><img src="./Proiektuaren irudiak/DendenKokapena.png"></p>

4. **Nor gara orria (nor-gara.html):** Proiektuaren informazio gehigarria, egilearen datuak eta lizentzia.
<p><img src="./Proiektuaren irudiak/NorGara.png"></p>
<p><img src="./Proiektuaren irudiak/QuienesSomos.png"></p>

Fluxu guztian zehar, erabiltzaileak hizkuntza aldatu dezake (euskera, ingelesa, gaztelania), eta tema argi/ilun botoiarekin aldatu. Interfazea erantzule da eta mugikorrentzako optimizatuta dago Bootstrap erabiliz.

## API Endpoints

- `GET /dendak`: Dendak lortu.
- `GET /herriak`: Herriak lortu.
- `GET /motak`: Mota desberdinak lortu.
- `GET /dendak-geojson`: GeoJSON formatuan dendak lortu.

## Gehigarriak

- Mapa interaktiboa dendak geolokalizatzeko.
- Hizkuntza anitzeko euskarria.
- Gai dinamikoa (argi/ilun).
- API RESTful backendarekin.
- Docker containerizazioa garapen eta ekoizpenerako.

### Proiektuaren Ahulguneak

Proiektu honek hainbat ahulgune ditu, eta horiek hobetzeko aukerak daude:

- **HTTPS falta:** Une honetan, aplikazioak HTTP soilik onartzen du. HTTPS gaitzea segurtasuna hobetuko luke, batez ere erabiltzaileen datuak babesteko. Ziurtagiri SSLak gehitu behar dira (adib. Let's Encrypt erabiliz).

- **Errendimendua:** Mapa handietan edo datu-base handietan, karga denbora luzeegiak izan daitezke. Cache optimizazio gehiago eta datu-base indizeak gehitu daitezke.

- **Erabiltzaile autentifikazioa falta:** Une honetan, ez dago erabiltzaile konturik edo autentifikazio sistemarik. Honek datuak editatzeko edo pertsonalizatzeko aukerak mugatzen ditu.

- **Mugikorrentzako optimizazioa:** Bootstrap erabiliz ondo optimizatuta dago, baina mapa interaktiboak errendimendu arazoak sor ditzake gailu zaharretan.

- **Datu-basearen segurtasuna:** SQL injekzioak saihesteko neurri gehiago hartu behar dira backend-en.

### Etorkizuneko Hobekuntzak

Proiektua etorkizunean hobetzeko ideia batzuk:

- **HTTPS inplementazioa:** Ziurtagiri SSLak gehitu eta HTTPtik HTTPSra automatikoki birbideratu.

- **Erabiltzaile autentifikazioa:** Login eta erregistro sistema gehitu, dendak gehitzeko edo editatzeko aukerarekin.

- **Bilaketa aurreratua:** Filtro gehiago (herria, mota, distantzia) eta bilaketa testu-librea.

- **API hedapena:** GeoJSON ez ezik, beste formatuak (KML, CSV) gehitu.

- **Notifikazioak:** Erabiltzaileei dendetako berriak edo eskaintzak jakinarazteko sistema.

- **Testak eta dokumentazioa:** Unitate testak eta API dokumentazioa (Swagger) gehitu.

- **Internazionalizazioa:** Hizkuntza gehiago gehitu (frantsesa, katalana).

- **Errendimendua hobetzea:** CDN erabiliz fitxategi estatikoak zerbitzatzea eta datu-base optimizazioa.

## Oharrak

- Proiektua garapenean dago; akatsak aurkitzen badituzu, jakinarazi.
- Ziurtagiri SSLak HTTPS gaitzeko beharrezkoak dira.
- Datu-basea `sql/init.sql` fitxategiarekin hasieratzen da.

---

© 2025 Ainhize Arrese - Paag2 Geolokalizazioa | Creative Commons CC-BY-ND

Lizentzia: [Creative Commons CC-BY-ND](https://creativecommons.org/licenses/by-nd/4.0/)
