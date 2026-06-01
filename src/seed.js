const { initializeDatabase, query } = require('./database');

const stickers = [
  { code: 'ARG-1', player_name: 'ARGENTINA', team: 'Argentina', position: 'Team' },
  { code: 'ARG-2', player_name: 'Escudo Argentina', team: 'Argentina', position: 'Escudo' },
  { code: 'ARG-3', player_name: 'Lionel Messi', team: 'Argentina', position: 'Delantero' },
  { code: 'ARG-4', player_name: 'Julian Alvarez', team: 'Argentina', position: 'Delantero' },
  { code: 'ARG-5', player_name: 'Lautaro Martinez', team: 'Argentina', position: 'Delantero' },
  { code: 'ARG-6', player_name: 'Angel Di Maria', team: 'Argentina', position: 'Centrocampista' },
  { code: 'ARG-7', player_name: 'Enzo Fernandez', team: 'Argentina', position: 'Centrocampista' },
  { code: 'ARG-8', player_name: 'Rodrigo De Paul', team: 'Argentina', position: 'Centrocampista' },
  { code: 'ARG-9', player_name: 'Alexis Mac Allister', team: 'Argentina', position: 'Centrocampista' },
  { code: 'ARG-10', player_name: 'Nicolas Otamendi', team: 'Argentina', position: 'Defensa' },
  { code: 'ARG-11', player_name: 'Cristian Romero', team: 'Argentina', position: 'Defensa' },
  { code: 'ARG-12', player_name: 'Nahuel Molina', team: 'Argentina', position: 'Defensa' },
  { code: 'ARG-13', player_name: 'Nicolas Tagliafico', team: 'Argentina', position: 'Defensa' },
  { code: 'ARG-14', player_name: 'Gonzalo Montiel', team: 'Argentina', position: 'Defensa' },
  { code: 'ARG-15', player_name: 'Emiliano Martinez', team: 'Argentina', position: 'Portero' },
  { code: 'ARG-16', player_name: 'Gerónimo Rulli', team: 'Argentina', position: 'Portero' },

  { code: 'BRA-1', player_name: 'BRASIL', team: 'Brasil', position: 'Team' },
  { code: 'BRA-2', player_name: 'Escudo Brasil', team: 'Brasil', position: 'Escudo' },
  { code: 'BRA-3', player_name: 'Neymar Jr', team: 'Brasil', position: 'Delantero' },
  { code: 'BRA-4', player_name: 'Vinicius Jr', team: 'Brasil', position: 'Delantero' },
  { code: 'BRA-5', player_name: 'Rodrygo', team: 'Brasil', position: 'Delantero' },
  { code: 'BRA-6', player_name: 'Richarlison', team: 'Brasil', position: 'Delantero' },
  { code: 'BRA-7', player_name: 'Raphinha', team: 'Brasil', position: 'Delantero' },
  { code: 'BRA-8', player_name: 'Casemiro', team: 'Brasil', position: 'Centrocampista' },
  { code: 'BRA-9', player_name: 'Bruno Guimaraes', team: 'Brasil', position: 'Centrocampista' },
  { code: 'BRA-10', player_name: 'Lucas Paqueta', team: 'Brasil', position: 'Centrocampista' },
  { code: 'BRA-11', player_name: 'Marquinhos', team: 'Brasil', position: 'Defensa' },
  { code: 'BRA-12', player_name: 'Eder Militao', team: 'Brasil', position: 'Defensa' },
  { code: 'BRA-13', player_name: 'Gabriel Magalhaes', team: 'Brasil', position: 'Defensa' },
  { code: 'BRA-14', player_name: 'Danilo', team: 'Brasil', position: 'Defensa' },
  { code: 'BRA-15', player_name: 'Alisson', team: 'Brasil', position: 'Portero' },
  { code: 'BRA-16', player_name: 'Ederson', team: 'Brasil', position: 'Portero' },

  { code: 'ESP-1', player_name: 'ESPAÑA', team: 'España', position: 'Team' },
  { code: 'ESP-2', player_name: 'Escudo España', team: 'España', position: 'Escudo' },
  { code: 'ESP-3', player_name: 'Lamine Yamal', team: 'España', position: 'Delantero' },
  { code: 'ESP-4', player_name: 'Nico Williams', team: 'España', position: 'Delantero' },
  { code: 'ESP-5', player_name: 'Alvaro Morata', team: 'España', position: 'Delantero' },
  { code: 'ESP-6', player_name: 'Pedri', team: 'España', position: 'Centrocampista' },
  { code: 'ESP-7', player_name: 'Rodri', team: 'España', position: 'Centrocampista' },
  { code: 'ESP-8', player_name: 'Gavi', team: 'España', position: 'Centrocampista' },
  { code: 'ESP-9', player_name: 'Fermin Lopez', team: 'España', position: 'Centrocampista' },
  { code: 'ESP-10', player_name: 'Dani Carvajal', team: 'España', position: 'Defensa' },
  { code: 'ESP-11', player_name: 'Aymeric Laporte', team: 'España', position: 'Defensa' },
  { code: 'ESP-12', player_name: 'Pau Cubarsi', team: 'España', position: 'Defensa' },
  { code: 'ESP-13', player_name: 'Alex Grimaldo', team: 'España', position: 'Defensa' },
  { code: 'ESP-14', player_name: 'Unai Simon', team: 'España', position: 'Portero' },
  { code: 'ESP-15', player_name: 'David Raya', team: 'España', position: 'Portero' },

  { code: 'FRA-1', player_name: 'FRANCIA', team: 'Francia', position: 'Team' },
  { code: 'FRA-2', player_name: 'Escudo Francia', team: 'Francia', position: 'Escudo' },
  { code: 'FRA-3', player_name: 'Kylian Mbappe', team: 'Francia', position: 'Delantero' },
  { code: 'FRA-4', player_name: 'Antoine Griezmann', team: 'Francia', position: 'Delantero' },
  { code: 'FRA-5', player_name: 'Ousmane Dembele', team: 'Francia', position: 'Delantero' },
  { code: 'FRA-6', player_name: 'Marcus Thuram', team: 'Francia', position: 'Delantero' },
  { code: 'FRA-7', player_name: 'Aurelien Tchouameni', team: 'Francia', position: 'Centrocampista' },
  { code: 'FRA-8', player_name: 'Eduardo Camavinga', team: 'Francia', position: 'Centrocampista' },
  { code: 'FRA-9', player_name: 'Adrien Rabiot', team: 'Francia', position: 'Centrocampista' },
  { code: 'FRA-10', player_name: 'Dayot Upamecano', team: 'Francia', position: 'Defensa' },
  { code: 'FRA-11', player_name: 'William Saliba', team: 'Francia', position: 'Defensa' },
  { code: 'FRA-12', player_name: 'Theo Hernandez', team: 'Francia', position: 'Defensa' },
  { code: 'FRA-13', player_name: 'Jules Kounde', team: 'Francia', position: 'Defensa' },
  { code: 'FRA-14', player_name: 'Mike Maignan', team: 'Francia', position: 'Portero' },
  { code: 'FRA-15', player_name: 'Lucas Chevalier', team: 'Francia', position: 'Portero' },

  { code: 'POR-1', player_name: 'PORTUGAL', team: 'Portugal', position: 'Team' },
  { code: 'POR-2', player_name: 'Escudo Portugal', team: 'Portugal', position: 'Escudo' },
  { code: 'POR-3', player_name: 'Cristiano Ronaldo', team: 'Portugal', position: 'Delantero' },
  { code: 'POR-4', player_name: 'Bruno Fernandes', team: 'Portugal', position: 'Centrocampista' },
  { code: 'POR-5', player_name: 'Bernardo Silva', team: 'Portugal', position: 'Centrocampista' },
  { code: 'POR-6', player_name: 'Rafael Leao', team: 'Portugal', position: 'Delantero' },
  { code: 'POR-7', player_name: 'Diogo Jota', team: 'Portugal', position: 'Delantero' },
  { code: 'POR-8', player_name: 'Joao Felix', team: 'Portugal', position: 'Delantero' },
  { code: 'POR-9', player_name: 'Vitinha', team: 'Portugal', position: 'Centrocampista' },
  { code: 'POR-10', player_name: 'Ruben Dias', team: 'Portugal', position: 'Defensa' },
  { code: 'POR-11', player_name: 'Antonio Silva', team: 'Portugal', position: 'Defensa' },
  { code: 'POR-12', player_name: 'Nuno Mendes', team: 'Portugal', position: 'Defensa' },
  { code: 'POR-13', player_name: 'Diogo Dalot', team: 'Portugal', position: 'Defensa' },
  { code: 'POR-14', player_name: 'Diogo Costa', team: 'Portugal', position: 'Portero' },
  { code: 'POR-15', player_name: 'Jose Sa', team: 'Portugal', position: 'Portero' },

  { code: 'ALE-1', player_name: 'ALEMANIA', team: 'Alemania', position: 'Team' },
  { code: 'ALE-2', player_name: 'Escudo Alemania', team: 'Alemania', position: 'Escudo' },
  { code: 'ALE-3', player_name: 'Jamal Musiala', team: 'Alemania', position: 'Centrocampista' },
  { code: 'ALE-4', player_name: 'Florian Wirtz', team: 'Alemania', position: 'Centrocampista' },
  { code: 'ALE-5', player_name: 'Ilkay Gundogan', team: 'Alemania', position: 'Centrocampista' },
  { code: 'ALE-6', player_name: 'Kai Havertz', team: 'Alemania', position: 'Delantero' },
  { code: 'ALE-7', player_name: 'Niclas Fullkrug', team: 'Alemania', position: 'Delantero' },
  { code: 'ALE-8', player_name: 'Toni Kroos', team: 'Alemania', position: 'Centrocampista' },
  { code: 'ALE-9', player_name: 'Joshua Kimmich', team: 'Alemania', position: 'Defensa' },
  { code: 'ALE-10', player_name: 'Antonio Rudiger', team: 'Alemania', position: 'Defensa' },
  { code: 'ALE-11', player_name: 'Jonathan Tah', team: 'Alemania', position: 'Defensa' },
  { code: 'ALE-12', player_name: 'David Raum', team: 'Alemania', position: 'Defensa' },
  { code: 'ALE-13', player_name: 'Marc-Andre ter Stegen', team: 'Alemania', position: 'Portero' },
  { code: 'ALE-14', player_name: 'Manuel Neuer', team: 'Alemania', position: 'Portero' },

  { code: 'ING-1', player_name: 'INGLATERRA', team: 'Inglaterra', position: 'Team' },
  { code: 'ING-2', player_name: 'Escudo Inglaterra', team: 'Inglaterra', position: 'Escudo' },
  { code: 'ING-3', player_name: 'Harry Kane', team: 'Inglaterra', position: 'Delantero' },
  { code: 'ING-4', player_name: 'Bukayo Saka', team: 'Inglaterra', position: 'Delantero' },
  { code: 'ING-5', player_name: 'Phil Foden', team: 'Inglaterra', position: 'Centrocampista' },
  { code: 'ING-6', player_name: 'Jude Bellingham', team: 'Inglaterra', position: 'Centrocampista' },
  { code: 'ING-7', player_name: 'Declan Rice', team: 'Inglaterra', position: 'Centrocampista' },
  { code: 'ING-8', player_name: 'Cole Palmer', team: 'Inglaterra', position: 'Centrocampista' },
  { code: 'ING-9', player_name: 'Marcus Rashford', team: 'Inglaterra', position: 'Delantero' },
  { code: 'ING-10', player_name: 'John Stones', team: 'Inglaterra', position: 'Defensa' },
  { code: 'ING-11', player_name: 'Harry Maguire', team: 'Inglaterra', position: 'Defensa' },
  { code: 'ING-12', player_name: 'Kyle Walker', team: 'Inglaterra', position: 'Defensa' },
  { code: 'ING-13', player_name: 'Luke Shaw', team: 'Inglaterra', position: 'Defensa' },
  { code: 'ING-14', player_name: 'Jordan Pickford', team: 'Inglaterra', position: 'Portero' },
  { code: 'ING-15', player_name: 'Aaron Ramsdale', team: 'Inglaterra', position: 'Portero' },
];

async function seed() {
  for (const s of stickers) {
    await query(
      `INSERT INTO stickers (code, player_name, team, position)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (code) DO NOTHING`,
      [s.code, s.player_name, s.team, s.position]
    );
  }
  console.log(`Seed completado: ${stickers.length} laminas insertadas`);
}

if (require.main === module) {
  require('dotenv').config();
  initializeDatabase().then(seed).catch(console.error);
}

module.exports = seed;
