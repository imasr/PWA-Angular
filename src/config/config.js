export const config = {
    image_url: "https://pikmail.herokuapp.com",
    menuData: [
        { title: 'dashboard', icon: 'fa-home' },
        { title: 'settings', icon: 'fa-cog' },
        { title: 'notification', icon: 'fa-bell' },
        { title: 'about', icon: 'fa-info-circle', },
        { title: 'logout', icon: 'fa-unlock-alt' }
    ],
    statusObj: [
        { id: 1, title: 'Online', icon: 'assets/green-light.png' },
        { id: 2, title: 'Do Not Disturb', icon: 'assets/red-light.png' },
        { id: 3, title: 'Away', icon: 'assets/blue-light.png' },
        { id: 4, title: 'Offline', icon: 'assets/gray-light.png' }
    ]
}