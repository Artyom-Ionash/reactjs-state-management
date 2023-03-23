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
    <div style={{ flex: "1" }}>
      <h2>{title}</h2>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 0,
          justifyContent: "center",
        }}
      >
        {cards.map((entity, i) => (
          <li style={{ margin: "10px" }} key={i}>
            {React.createElement(cardComponent, { entity })}
          </li>
        ))}
      </ul>
    </div>
  );
};
