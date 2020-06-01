import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";
import moment from "moment";

export class SqlService extends BaseService {
  constructor(app: ServiceContainer) {
    super(app);
  }

  /* Rechercher les demandes faites après une date donnée */
  async getDemandeBetweenDate(dateOne: Date, dateTwo: Date) {
    const [result] = await this.context.database.client
      .query(`SELECT * FROM DEMANDE WHERE DATEDEMANDE BETWEEN '${moment(
      dateOne
    ).format("DD/MM/YYYY")}' AND '${moment(dateTwo).format("DD/MM/YYYY")}' ;
`);
    return result;
  }

  /* Afficher les infos selon la demande donnée */
  async getInformationsFromDemande(noDemande: string) {
    const [result] = await this.context.database.client.query(
      `SELECT RaisonSociale, NoTournee, QuantiteEnlevee FROM DEMANDE INNER JOIN ENTREPRISE ON DEMANDE.SIRET = ENTREPRISE.SIRET INNER JOIN DETAILDEMANDE ON DEMANDE.NoDemande = DETAILDEMANDE.NoDemande WHERE DEMANDE.NoDemande = ${noDemande};`
    );
    return result;
  }

  /* Afficher la quantite totale recuperée par type de dechet pour un mois / année donnée */
  async getQtyByType(dateOne: Date, dateTwo: Date) {
    const [result] = await this.context.database.client.query(
      `SELECT SUM(QuantiteDeposee) FROM DETAILDEPOT INNER JOIN TYPEDECHET ON DETAILDEPOT.NoTypeDechet = TYPEDECHET.NoTypeDechet INNER JOIN TOURNEE ON TOURNEE.NoTournee = DETAILDEPOT.NoTournee WHERE DATETOURNEE BETWEEN '${moment(
        dateOne
      ).format("DD/MM/YYYY")}' AND '${moment(dateTwo).format(
        "DD/MM/YYYY"
      )}' GROUP BY DETAILDEPOT.NoTypeDechet;`
    );
    return result;
  }

  /* afficher les employés ayant réalisé moins de n tournée, trié par nbr de tournée */
  async getEmployeesWhoHaveNTournee(numberTournee: number) {
    const [result] = await this.context.database.client.query(
      `SELECT EMPLOYE.NOEMPLOYE, NOM, PRENOM, COUNT(NOTOURNEE) FROM EMPLOYE INNER JOIN TOURNEE ON TOURNEE.NOEMPLOYE = EMPLOYE.NOEMPLOYE GROUP BY TOURNEE.NOEMPLOYE HAVING COUNT(NOTOURNEE) < ${numberTournee};`
    );
    return result;
  }

  /* afficher les infos de l'entreprise qui a réalisé plus de demande que Formalys */
  async getInformationFromEntrepriseWhoMadeMoreAskingThat(
    that: string = "Formalys"
  ) {
    const [result] = await this.context.database.client.query(
      `SELECT RAISONSOCIALE, COUNT(NoDemande) FROM ENTREPRISE INNER JOIN DEMANDE ON ENTREPRISE.SIRET = DEMANDE.SIRET GROUP BY NoDemande HAVING COUNT(NoDemande) > ((SELECT COUNT(NoDemande) FROM DEMANDE INNER JOIN ENTREPRISE ON ENTREPRISE.SIRET = DEMANDE.SIRET WHERE ENTREPRISE.RAISONSOCIALE = "${that}" GROUP BY NoDemande));`
    );
    return result;
  }

  /* Afficher les infos des demandes qui ne sont pas encore inscrites dans une tournée */
  async getDemandeWhoIsntInTournee() {
    const [result] = await this.context.database.client.query(
      `SELECT DEMANDE.* FROM DEMANDE INNER JOIN TOURNEE ON TOURNEE.NoTournee = DEMANDE.NoTournee WHERE NoDemande NOT IN(SELECT NoDemande FROM DEMANDE INNER JOIN TOURNEE ON DEMANDE.NoTournee= TOURNEE.NoTournee);`
    );
    return result;
  }

  // TODO PROC
}
