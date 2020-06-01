
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

/* Procédure qui va permettre d'afficher les déchets collectées entre deux dates choisies sur un site et un type de déchet précis */
DELIMITER //
CREATE PROCEDURE qty_dechet_collectee_par_site_et_periode
(P_NOM_TYPE_DECHET INTEGER, P_ID_SITE INTEGER, P_DATEDEBUT DATETIME,
P_DATEFIN DATETIME)
BEGIN
SELECT SUM(QuantiteDeposee) FROM DETAILDEPOT
INNER JOIN TYPEDECHET ON DETAILDEPOT.NoTypeDechet = TYPEDECHET.NoTypeDechet
INNER JOIN TOURNEE ON TOURNEE.NoTournee = DETAILDEPOT.NoTournee
INNER JOIN ENTREPRISE ON ENTREPRISE.SIRET = DEMANDE.SIRET
INNER JOIN DEMANDE ON TOURNEE.NoTournee = DEMANDE.NoTournee
WHERE TYPEDECHET.NomTypeDechet = P_NOM_TYPE_DECHET AND 
DATETOURNEE BETWEEN P_DATEDEBUT AND P_DATEFIN
AND ENTREPRISE.SIRET = P_ID_SITE
GROUP BY NoTypeDechet;
END;
//
DELIMITER ;

/* Retrouver la quantite totale collectée pour chaque site pour un type de déchet*/
DELIMITER //
CREATE PROCEDURE qty_dechet_collectee_totale_par_periode
(P_NOM_TYPE_DECHET INTEGER, P_DATEDEBUT DATETIME, P_DATEFIN DATETIME)
BEGIN
SELECT SUM(QuantiteDeposee) FROM DETAILDEPOT
INNER JOIN TYPEDECHET ON DETAILDEPOT.NoTypeDechet = TYPEDECHET.NoTypeDechet
INNER JOIN TOURNEE ON TOURNEE.NoTournee = DETAILDEPOT.NoTournee
WHERE TYPEDECHET.NomTypeDechet = P_NOM_TYPE_DECHET AND 
DATETOURNEE BETWEEN P_DATEDEBUT AND P_DATEFIN
GROUP BY NoTypeDechet;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER check_qty_deposee BEFORE INSERT ON DETAILDEPOT
FOR EACH ROW
	BEGIN
	 	SELECT SUM(QuantiteEnlevee) as TOTAL_DECHET_DEPOSE FROM DETAILDEMANDE
		INNER JOIN DEMANDE ON DETAILDEMANDE.NoDemande = DEMANDE.NoDemande
        INNER JOIN DETAILDEPOT ON DEMANDE.NoTournee = DETAILDEPOT.NoTournee
		INNER JOIN TOURNEE ON TOURNEE.NoTournee = DETAILDEPOT.NoTournee
		WHERE TOURNEE.NoTournee = NEW.NoTournee;
		IF new.DETAILDEPOT.QuantiteDeposee > TOTAL_DECHET_DEPOSE THEN
			SIGNAL SQLSTATE '22003'
			SET MESSAGE_TEXT = 'La quantité déposée ne peut pas être supérieure à la quantité prélevée lors de la tournée';
		END IF;
	END;
//
DELIMITER ;

