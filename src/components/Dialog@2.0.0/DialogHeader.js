import React from 'react';

export default function DialogHeader({ children, bottom }) {
  return (
    <section className={`dialog-header ${bottom ? 'bottom' : ''}`}>
      {children}
    </section>
  );
}

DialogHeader.defaultProps = {
  bottom: false,
};
