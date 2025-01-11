export async function fetchUserLinks() {
    try {
      const response = await fetch("/api/userLinks");
      if (!response.ok) {
        throw new Error("Error fetching user links");
      }
      const { links } = await response.json();
      return links;
    } catch (error) {
      console.error("Failed to fetch links:", error);
      throw error;
    }
  }
  