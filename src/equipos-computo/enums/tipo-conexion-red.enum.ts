export enum TipoConexionRed {
  ETHERNET = "Cable Ethernet",       // Conexión física por cable
  WIFI = "WiFi",                    // Conexión inalámbrica
  DATOS_MOVILES = "Datos móviles",   // Conexión celular (3G, 4G, 5G)
  BLUETOOTH = "Bluetooth",           // Conexión inalámbrica de corto alcance
  VPN = "VPN",                       // Conexión privada virtual
  SATELITAL = "Satelital",           // Conexión vía satélite
  DESCONOCIDA = "Desconocida",       // Estado no identificado
  SIN_CONEXION = "Sin conexión"      // No hay acceso a red
}