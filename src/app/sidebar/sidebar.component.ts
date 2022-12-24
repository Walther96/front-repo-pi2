import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/server/models/usuario';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/mantbase', title: 'Mant - Bases', icon: 'nc-bank', class: '' },
    { path: '/mantdestino', title: 'Mant - Destinos', icon: 'nc-pin-3', class: '' },
    { path: '/mantresguardo', title: 'Mant - Emp Resguardo', icon: 'nc-circle-10', class: '' },
    //{ path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    //{ path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    //{ path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    //{ path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    //{ path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/usuarioperfil', title: 'Perfiles - usuarios', icon: 'nc-single-02', class: '' },
    { path: '/requerimientosalida', title: 'Lista de salidas', icon: 'nc-send', class: '' },
    { path: '/historicosalidas', title: 'Historial de salidas', icon: 'nc-paper', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    public menuItems: any[];
    usuario: Usuario;
    rutas: RouteInfo[];

    ngOnInit() {
/*
        var data = JSON.parse(localStorage.getItem("usuario"));

        this.menuItems = data.rol.detalleRol;
        this.menuItems.push({
            path: "/ruta",
            title: "Crear ruta",
            icon: "pi pi-map-marker",
            class: ''
        });
        this.menuItems.push({
            path: "/buscaruta",
            title: "Buscar ruta",
            icon: "pi pi-map-marker",
            class: ''
        });
        this.menuItems.push({
            path: "/mant-base",
            title: "Mant - Base",
            icon: "pi pi-briefcase",
            class: ''
        });
        this.menuItems.push({
            path: "/mant-destino",
            title: "Mant - Destino",
            icon: "pi pi-briefcase",
            class: ''
        });
        this.menuItems.push({
            path: "/mant-empleado",
            title: "Mant - Empleado",
            icon: "pi pi-briefcase",
            class: ''
        });
        
        this.menuItems.push({
            path: "/mant-vehiculo",
            title: "Mant - Vehiculo",
            icon: "pi pi-briefcase",
            class: ''
        });
        */

        var data = JSON.parse(localStorage.getItem("usuario"));
        this.rutas = [];
        
        data.rol.detalleRol.forEach(element => {
            this.rutas.push({
                path: "/"+element.menu.path.toString(),
                title: element.menu.nombre.toString(),
                icon: "pi pi-briefcase",
                class: ''
            });
        });

        //this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.menuItems = this.rutas.filter(menuItem => menuItem);
    }
}
