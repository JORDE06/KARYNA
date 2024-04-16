# Karyna Variedades

¡Bienvenido a Karyna Variedades!

Este repositorio contiene el código fuente para la tienda de variedades "Karyna Variedades". Es una aplicación de gestión de inventario y ventas diseñada para ayudar a los propietarios de pequeñas tiendas a administrar sus productos y realizar ventas de manera eficiente.

## Funcionalidades

- **Gestión de inventario:** Mantén un registro actualizado de todos los productos disponibles en la tienda, incluyendo información como nombre, descripción, precio y cantidad en stock.
- **Realización de ventas:** Permite a los empleados registrar ventas, seleccionar productos, aplicar descuentos y generar facturas para los clientes.
- **Generación de informes:** Ofrece la capacidad de generar informes detallados sobre las ventas realizadas, los productos más vendidos y otros datos relevantes para el negocio.
- **Gestión de empleados:** Permite crear cuentas de usuario para los empleados y asignarles diferentes roles y permisos dentro del sistema.

## Instalación

Para utilizar la aplicación "Karyna Variedades", sigue estos pasos de instalación:

1. Clona el repositorio en tu máquina local:

```bash
git clone <URL_del_repositorio>

cd karyna_variedades
pip install -r requirements.txt

python main.py

from inventory import Inventory

inventory = Inventory()
inventory.add_product("Nuevo Producto", "Descripción del producto", 10.99, 100)

from sales import Sales

sales = Sales()
sales.register_sale("ID_Producto", 5, "ID_Empleado")

from reports import generate_sales_report

generate_sales_report("2024-04-15")





