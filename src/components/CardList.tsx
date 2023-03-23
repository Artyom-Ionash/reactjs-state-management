import React from "react";

export const CardList = <T extends {}>({
  title,
  cards,
  cardComponent,
}: {
  title: string;
  cards: T[];
  cardComponent: React.ComponentType<{ entity: T }>;
}) => {
  return (
    <div style={{ flex: "1", marginRight: "1rem" }}>
      <h2>{title}</h2>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 10,
          width: "100%",
        }}
      >
        {cards.map((entity, i) => (
          <li key={i}>{React.createElement(cardComponent, { entity })}</li>
        ))}
      </ul>
    </div>
  );
};
