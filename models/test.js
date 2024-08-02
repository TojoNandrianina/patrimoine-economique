import { expect } from 'chai';
import { describe, it } from 'mocha';
import Personne from './Personne';
import Possession from './possessions/Possession';
import Patrimoine from './Patrimoine';
import Argent from './possessions/Argent';
import BienMateriel from './possessions/BienMateriel';
import Flux from './possessions/Flux';

describe('Possession', () => {
  it('should calculate amortized value correctly', () => {
    const personne = new Personne('Tojo Nandrianina');
    const dateDebut = new Date(2022, 0, 1);
    const dateFin = new Date(2024, 0, 1);
    const possession = new Possession(personne, 'Voiture', 10000, dateDebut, dateFin, 10);

    const dateTest = new Date(2023, 0, 1);
    const valeurAttendue = 9000; // 10% d'amortissement pour un an
    const valeurCalculee = possession.getValeur(dateTest);

    expect(valeurCalculee).to.equal(valeurAttendue);
  });
});

describe('Patrimoine', () => {
  it('should calculate total value correctly', () => {
    const personne = new Personne('Tojo Nandrianina');
    const dateDebut = new Date(2022, 0, 1);
    const dateFin = new Date(2024, 0, 1);
    const possession1 = new Possession(personne, 'Voiture', 10000, dateDebut, dateFin, 10);
    const possession2 = new Possession(personne, 'Maison', 200000, dateDebut, dateFin, 5);

    const patrimoine = new Patrimoine(personne, [possession1, possession2]);

    const dateTest = new Date(2023, 0, 1);
    const valeurTotaleAttendue = 9000 + 190000; // valeurs après amortissement
    const valeurTotaleCalculee = patrimoine.getValeur(dateTest);

    expect(valeurTotaleCalculee).to.equal(valeurTotaleAttendue);
  });
});

describe('Argent', () => {
  it('should return the correct value if within date range', () => {
    const personne = new Personne('Tojo Nandrianina');
    const dateDebut = new Date(2022, 0, 1);
    const dateFin = new Date(2024, 0, 1);
    const argent = new Argent(personne, 'Compte Courant', 5000, dateDebut, dateFin, 0, TYPE_ARGENT.Courant);

    const dateTest = new Date(2023, 0, 1);
    const valeurAttendue = 5000;
    const valeurCalculee = argent.getValeur(dateTest);

    expect(valeurCalculee).to.equal(valeurAttendue);
  });
});

describe('BienMateriel', () => {
  it('should use getValeur method from Possession', () => {
    const personne = new Personne('Tojo Nandrianina');
    const dateDebut = new Date(2022, 0, 1);
    const dateFin = new Date(2024, 0, 1);
    const bienMateriel = new BienMateriel(personne, 'Voiture', 10000, dateDebut, dateFin, 10);

    const dateTest = new Date(2023, 0, 1);
    const valeurAttendue = 9000;
    const valeurCalculee = bienMateriel.getValeur(dateTest);

    expect(valeurCalculee).to.equal(valeurAttendue);
  });
});

describe('Flux', () => {
  it('should calculate total flux value correctly', () => {
    const personne = new Personne('Tojo Nandrianina');
    const dateDebut = new Date(2022, 0, 1);
    const dateFin = new Date(2024, 0, 1);
    const flux = new Flux(personne, 'Salaire', 2000, dateDebut, dateFin, 0, 1);

    const dateTest = new Date(2023, 0, 1);
    const valeurAttendue = 2000 * 12; // salaire mensuel pendant un an
    const valeurCalculee = flux.getValeur(dateTest);

    expect(valeurCalculee).to.equal(valeurAttendue);
  });
});
