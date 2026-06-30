export const teamMembers = [
  {key: "dilnoza", image: "/worker-woman.png", position: "object-center"},
  {key: "nargiza", image: "/worker-woman.png", position: "object-[54%_center]"},
  {key: "aziz", image: "/worker-man.png", position: "object-center"},
  {key: "timur", image: "/worker-man.png", position: "object-[48%_center]"},
  {key: "malika", image: "/worker-woman.png", position: "object-[46%_center]"},
] as const;

export type TeamMemberKey = (typeof teamMembers)[number]["key"];
