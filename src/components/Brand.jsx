import React from 'react';
import { Link } from 'react-router';

export default function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? 'brand-footer' : ''}`} to="/" aria-label="Golden Home, home">
    <img src="/logo.jpeg" alt="Golden Home Premium Cleaning Service" width="112" height="112" />
  </Link>;
}
