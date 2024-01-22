import React from 'react'
import Dropdown from '@components/Landing/Dropdown'
import { mount } from 'cypress/react18';
import countries from '@data/countries.json';

describe('Test the dropdown functionality', () => {
  beforeEach(() => {
    cy.mount(<Dropdown options={countries} />);
  })

  it('renders with mock data', () => {
  });
});

