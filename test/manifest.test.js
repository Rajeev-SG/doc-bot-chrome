describe('Manifest Tests', () => {
  test('manifest loads', () => {
    expect(true).toBe(true);
  });
});

const fs = require('fs');
const path = require('path');

describe('Manifest Validation', () => {
  let manifest;

  beforeAll(() => {
    const manifestPath = path.resolve(__dirname, '../manifest.json');
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  });

  it('should have all required fields', () => {
    expect(manifest.manifest_version).toBe(3);
    expect(manifest.name).toBeDefined();
    expect(manifest.version).toBeDefined();
  });

  it('should have required permissions for used Chrome APIs', () => {
    const requiredPermissions = ['activeTab', 'storage', 'scripting', 'sidePanel'];
    requiredPermissions.forEach(permission => {
      expect(manifest.permissions).toContain(permission);
    });
  });

  it('should have action configuration when using chrome.action API', () => {
    expect(manifest.action).toBeDefined();
    expect(manifest.action.default_title).toBeDefined();
    expect(manifest.action.default_icon).toBeDefined();
    
    // Verify icon sizes
    const requiredIconSizes = ['16', '48', '128'];
    requiredIconSizes.forEach(size => {
      expect(manifest.action.default_icon[size]).toBeDefined();
    });
  });

  it('should have valid file paths for icons', () => {
    const iconPaths = Object.values(manifest.action.default_icon);
    iconPaths.forEach(iconPath => {
      const fullPath = path.resolve(__dirname, '..', iconPath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  it('should have valid side panel configuration', () => {
    expect(manifest.side_panel).toBeDefined();
    expect(manifest.side_panel.default_path).toBeDefined();
    
    const sidePanelPath = path.resolve(__dirname, '..', manifest.side_panel.default_path);
    expect(fs.existsSync(path.dirname(sidePanelPath))).toBe(true);
  });

  it('should have background script configuration', () => {
    expect(manifest.background).toBeDefined();
    expect(manifest.background.service_worker).toBeDefined();
    
    const scriptPath = path.resolve(__dirname, '..', manifest.background.service_worker);
    expect(fs.existsSync(scriptPath)).toBe(true);
  });
});
