import {
  bookingTypes,
  titularOptions,
  hijos,
  estadoCivil,
  ojos,
} from "../mocks/responses";

const prenotaURL = Cypress.env("prenota_url");
const servicio = Cypress.env("servicio");
const servicioJueves = Cypress.env("servicio_jueves");
const service = servicioJueves;

const bigTimeout = { timeout: 20000, log: false };
const noLog = { log: false };
const endpoints = [
  "@GetBookingTypes",
  "@titularOptions",
  "@hijosOptions",
  "@estadoCivilOptions",
  //"@ojosOptions",
];

describe("consulado italiano", () => {
  beforeEach(() => {
    // cy.wrap('[name=Email]').as('email');
    cy.intercept("GET", "GetBookingTypes", bookingTypes).as("GetBookingTypes");
    cy.intercept("GET", "?id=1", titularOptions).as("titularOptions");
    cy.intercept("GET", "?id=11", hijos).as("hijosOptions");
    cy.intercept("GET", "?id=17", estadoCivil).as("estadoCivilOptions");
    cy.intercept("GET", "?id=17", estadoCivil).as("estadoCivilOptions");
    //cy.intercept("GET", "?id=23", ojos).as("ojosOptions");
    cy.intercept("GET", "/UserArea").as("userArea");

    cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });

  it("prenota passaporto - Primero", () => {
    //cy.pause();
    //espera la pagina
    cy.wait("@userArea");
    //cy.getNotLog('a[href="/Services"]', noLog);

    //va al servicio elegido
    cy.visit(`${prenotaURL}/Services/Booking/${service}`);
    cy.wait(endpoints);

    // INPUTS

    // # de hijos
    cy.typeNotLog("#DatiAddizionaliPrenotante_2___testo", "1");

    // direccion
    cy.typeNotLog(
      "#DatiAddizionaliPrenotante_3___testo",
      Cypress.env("ADDRESS")
    );

    // altura en cms
    cy.typeNotLog("#DatiAddizionaliPrenotante_5___testo", "140");

    // conyugue
    cy.typeNotLog(
      "#DatiAddizionaliPrenotante_7___testo",
      Cypress.env("CONYUGE")
    );

    // notas
    cy.typeNotLog(
      "#BookingNotes",
      "Los datos del solicitante corresponden a mi hija. Renovacion de pasaporte por viaje a España urgente"
    );

    // check
    cy.getNotLog("#PrivacyCheck").check();

    //files
    cy.get("#File_0").attachFile("../documentation/solicitante_dni.pdf");
    cy.get("#File_1").attachFile("../documentation/solicitante_pasaporte.pdf");
    cy.get("#File_2").attachFile("../documentation/solicitante_pasaporte.pdf");
    cy.get("#File_3").attachFile("../documentation/conyuge_pasaporte.pdf");

    // dropdowns
    //hijos?
    cy.getNotLog("#ddls_1").as("hijos");
    cy.getNotLog("@hijos").select("11");

    //titular?
    cy.getNotLog("#ddls_0", bigTimeout).as("titular");
    cy.getNotLog("@titular").select("2");

    //estado civil?
    cy.getNotLog("#ddls_4", bigTimeout).as("estadoCivil");
    cy.getNotLog("@estadoCivil").select("16");

    //ojos?
    cy.getNotLog("#ddls_6", bigTimeout).as("ojos");
    cy.getNotLog("@ojos").select("23");

    cy.get("#btnAvanti").click(noLog);
  });
});
