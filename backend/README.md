# Backend

### index.js

### .env

## Controller

## Model

### user.js 

## Services

# backend/
  ## controllers/
    hier zit de funtionaliteit van met de backend. bv. authController.js heeft de backend functie loginUser en registerUser die de data van de frontend aan nemen en een user aanmaakt en naar de database stuurt en het paswoord encrypte, enzo backend stuff 
  ## helper/  
  hier kan je helper funties zetten bv voor iets te encrypteren fzo, 
  ## model 
  hier worden modellen gedefiened voor een object, een model(database schema) beschrijft hoe een object eruit ziet , welke data het bevat. bv een user model heeft een naam, email, ... Dit wordt gebruikt voor de database. een model is een mongoose schema
  ## Routes/
  Hier worde de POST, GET, ... requesten gestuurd voor (!!Belangrijk: dit zijn backend routes, deze backend routes volgen server request. frotend routes volgen paginas  ) routes te maken, authRoutes.js bevat dus de functionality om wanneer  de frontend een request stuurt om te registreren dat de registerUser funtie in controllers wordt opgeroepen.
 ## services 
 hier zit de API funtionaliteiten 

 ## index.js 
 dit is de main server

# /frontend 
## /src/components
hier zitten de react componenten die in de paginas kunnen worden gezet, dit zijn gewoon aparte onderdelen die worden kunnen worden toegevoegd
## /src/context 
Deze bestanden geven een pagina context. bv usercontext wordt gewerapt rond de hele App, dus onze app weet wie de user is. Dit is in principe de link tussen frontend en backend voor de user. de context vraagt de data op van een object in de backend en geet een cookie terug met de data van dat object(bv de user)
## /src/pages 
Dit zijn de paginas van de App, homepage, acountpage enzo. hierien zit de structuur van de pagina en de stijl(css file), Zet of stijl hier GEEN aparte 'HTML componenten' maak een apart compenet in /components/.. en voeg dat component toe aan de pagina, ook geen funties met de backend die zet ge in /components/.. tenzij het echt met de pagina te maken heeft. dus u interacties met een component op de pagina zet je in /components/ niet in /pages/...

## App.tsx 
Dit is heel de website, dus alle paginas. Hier moet niet echt iets worden toegevoegd
## index.ts
Hier zit de App in. Dit rendered gewoon onze react app, Hier moet ook niet echt iets worden toegevoegd.