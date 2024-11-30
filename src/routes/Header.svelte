<script lang="ts">
    import logo from "$lib/images/wildstar.jpg";
    import { DarkMode } from "flowbite-svelte";
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        NavLi,
    } from "flowbite-svelte";
</script>

<Navbar>
    <NavBrand>
        <img
            src={logo}
            alt="WildStar Logo"
            class="me-3 h-6 sm:h-9"
        />
        <DarkMode style="margin-right: 1rem"/>
    </NavBrand>
    <NavHamburger />
    <NavUl>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/about">About</NavLi>
        <NavLi href="/quests">Quests</NavLi>
        <NavLi href="/players">Players</NavLi>
        <NavLi href="/explorer">Explorer</NavLi>
    </NavUl>

    </Navbar>

<style>
    .logo {
        height: 1rem;
    }
</style>