<script lang="ts">
    /*globals APIResponse */
    import { User } from '../stores';
    import Dropdown from './Dropdown.svelte';

    export let breadcrumbs: { path: string; label: string }[] = [];

    async function logout() {
        await fetch('__apiRoute__/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res: Response) => res.json())
            .then((data: APIResponse<null>) => {
                if (data.meta.success) {
                    window.location.href = '/#/';
                }
            })
            .catch(err => console.log(err));
    }

    const handleLogout = () => {
        open = true;
    };

    let open = false;
</script>

<nav>
    <div class="breadcrumb">
        {#each breadcrumbs as breadcrumb, index}
            <a
                class="breadcrumb-text"
                class:breadcrumb-main={index === breadcrumbs.length - 1}
                href={`/#${breadcrumb.path}`}
            >
                {breadcrumb.label}
            </a>
            {#if index !== breadcrumbs.length - 1}
                <span class="material-icons icon"> chevron_right </span>
            {/if}
        {/each}
    </div>
    <div class="navbar-right">
        <span class="material-icons">account_circle</span>
        <span class="navbar-user-name" on:click={handleLogout}>{$User['email']}</span>
        <span class="material-icons" on:click={handleLogout}>
            expand_more
            <span class="dropdown">
                <Dropdown
                    bind:open
                    items={[
                        {
                            label: 'LOGOUT',
                            icon: 'logout',
                            action: () => {
                                void logout();
                            }
                        }
                    ]}
                />
            </span>
        </span>
    </div>
</nav>

<style>
    nav {
        margin-top: 25px;
        height: 50px;
        margin-bottom: 30px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        color: #0e0d0d;
    }

    span.dropdown {
        font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu,
            Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .breadcrumb {
        display: flex;
        flex-direction: row;
        font-size: 20px;
        align-items: center;
        margin-left: 25px;
    }

    .breadcrumb-text {
        cursor: pointer;
        text-decoration: none;
        color: #0e0d0d;
    }

    .breadcrumb-main {
        font-weight: 500;
    }

    .navbar-right {
        display: flex;
        height: 100%;
        align-items: center;
        margin-right: 25px;
        cursor: pointer;
    }

    .navbar-user-name {
        padding: 0px 4px 4px;
    }

    @media only screen and (max-width: 600px) {
        nav {
            height: 30px;
            margin-bottom: 20px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            color: #0e0d0d;
        }

        .breadcrumb {
            font-size: 14px;
        }

        .navbar-user-name {
            font-size: 14px;
        }

        .navbar-right {
            padding-left: 8px;
        }
    }
</style>
