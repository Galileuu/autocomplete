import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Autocomplete from '../components/AutoComplete';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
];

const Home: NextPage = () => {
  return (
    <div >
      <Autocomplete options={countries} />
    </div>
  );
};

export default Home;
