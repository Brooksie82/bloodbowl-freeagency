import { Player } from '../types/Player';
import { PlayerFilters } from '../components/PlayerFilters';

export const filterPlayers = (players: Player[], filters: PlayerFilters): Player[] => {
  return players.filter(player => {
    // Name filter (case-insensitive)
    if (filters.name && !player.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }

    // Race filter
    if (filters.race && player.race !== filters.race) {
      return false;
    }

    // Position filter
    if (filters.position && player.position !== filters.position) {
      return false;
    }

    // Skills filter (player must have ALL selected skills)
    if (filters.skills.length > 0) {
      const playerSkills = player.skills.split(', ').map(skill => skill.trim());
      const hasAllSkills = filters.skills.every(skill => 
        playerSkills.some(playerSkill => 
          playerSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasAllSkills) {
        return false;
      }
    }

    // Value range filter
    const playerValue = parseInt(player.value) || 0;
    if (filters.minValue) {
      const minValue = parseInt(filters.minValue);
      if (playerValue < minValue) {
        return false;
      }
    }
    if (filters.maxValue) {
      const maxValue = parseInt(filters.maxValue);
      if (playerValue > maxValue) {
        return false;
      }
    }

    return true;
  });
}; 