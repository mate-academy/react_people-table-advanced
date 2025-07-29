export const isActive = (currentPath: string, targetPath: string): boolean => {
  if (targetPath === '/') {
    return currentPath === targetPath;
  }

  return currentPath.startsWith(targetPath);
};
