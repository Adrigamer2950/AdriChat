module.exports = {
  prefix: 'ac!',
  superusers: [/*Adrigamer*/ '353104236491309056' /*Adrigamer*/, /*tnfangel*/ '456361646273593345' /*tnfangel*/, /*Cooky*/ '528860743437910016' /*Cooky*/],
  categories: [
    {name: "general", priority: 10}, 
    {name: "mod", priority: 9}, 
    {name: "admin", priority: 8},
    {name: "admin_server", priority: 7},
    {name: "owner_cp", priority: 6},
    {name: "owner", priority: 5}
  ],
  groups: [
    {name: "User", permLvl: 0},
    {name: "Mod", permLvl: 1},
    {name: "Beta Tester", permLvl: 2},
    {name: "Admin", permLvl: 3},
    {name: "Admin_Server", permLvl: 4},
    {name: "Owner_CP", permLvl: 5},
    {name: "Owner", permLvl: 6},
  ]
}