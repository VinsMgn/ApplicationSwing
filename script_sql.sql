use mspr;

-- les tables sans FK
-- ==================
create table entreprise
(Siret		 int not null,
RaisonSociale	 varchar(50) not null,
NoRueEntr	 int,
RueEntr		 varchar(200),
CpostalEntr	 int,
VilleEntr	 varchar(50),
NoTel		 char(10),
Contact		 varchar(50),
constraint PK_entreprise primary key(Siret)
);

create table centretraitement
(NoCentre	 int not null,
NomCentre	 varchar(100),
NoRueCentre	 int,
RueCentre	 varchar(200),
CpostalCentre	 int,
VilleCentre	 varchar(50),
constraint PK_centretraitement primary key(Nocentre)
);

create table fonction
(NoFonction	 int not null,
NomFonction	 varchar(50) not null,
constraint PK_Fonction primary key(NoFonction)
);	

create table employe
(NoEmploye	 int not null,
Nom		 varchar(50),
Prenom		 varchar(50),
dateNaiss	 date,
dateEmbauche	 date,
Salaire		 int,
NoFonction	 int not null,
constraint FK_employe_fonction foreign key (NoFonction) references fonction(NoFonction),
constraint PK_employe primary key(Noemploye)
);

create table typedechet
(NoTypeDechet	 int not null,
NomTypeDechet	 varchar(50),
Niv_danger	 int,
constraint PK_typedechet primary key(Notypedechet)
);

create table camion
(NoImmatric	 char(10) not null,
DateAchat	 date,
Modele 		 varchar(50) not null,
Marque		 varchar(50) not null,
constraint PK_camion primary key(NoImmatric)
);


-- les tables avec FK 'simple'
-- ===========================
create table tournee
(NoTournee	 int not null,
DateTournee	 date,
NoImmatric	 char(10) not null,
NoEmploye	 int not null,
constraint PK_tournee primary key(Notournee),
constraint FK_tournee_camion foreign key (NoImmatric) references camion(noImmatric),
constraint FK_tournee_employe foreign key (noemploye) references employe(noemploye)
);

create table demande
(NoDemande	 int not null,
DateDemande	 date,
DateEnlevement	 date,
Web_O_N		 char(1),
Siret		 int not null,
NoTournee	 int null,
constraint PK_demande primary key(Nodemande),
constraint FK_demande_entreprise foreign key (Siret) references entreprise(Siret),
constraint FK_demande_tournee foreign key (notournee) references tournee(notournee)
);


-- les tables avec FK/PK
-- =====================

create table detaildemande
(QuantiteEnlevee	 int not null,
Remarque		 varchar(100),
NoDemande		 int not null,
NoTypeDechet		 int not null,
constraint PK_detaildemande primary key(Nodemande, notypedechet),
constraint FK_detaildem_demande foreign key (NoDemande) references demande(NoDemande),
constraint FK_detaildem_typedech foreign key (notypedechet) references typedechet(notypedechet)
);

create table detaildepot
(QuantiteDeposee	 int not null,
NoTournee		 int not null,
NoTypeDechet		 int not null,
NoCentre		 int not null,
constraint PK_detaildepot primary key(Notournee, notypedechet, nocentre),
constraint FK_detaildep_tournee foreign key (NoTournee) references tournee(NoTournee),
constraint FK_detaildep_typedech foreign key (notypedechet) references typedechet(notypedechet),
constraint FK_detaildep_centre foreign key (NoCentre) references centretraitement(NoCentre)
);


