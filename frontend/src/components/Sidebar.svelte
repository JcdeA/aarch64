<script>
    import { link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';
    import { Projects, User } from '../stores';

    let sidebar = [
        { header: 'Projects', items: [], open: true },
        {
            header: 'Manage',
            items: [
                { name: 'Create New VM', route: '/dashboard/create' },
                { name: 'Global Audit Log', route: '/dashboard/auditlog', admin: true }
            ],
            open: true
        },
        {
            header: 'Account',
            items: [
                { name: 'Settings', route: '/dashboard/account' },
                { name: 'Docs', route: '/docs' },
                {
                    name: 'Feedback',
                    route: 'https://roadmap.aarch64.com/aarch64',
                    isGlobal: true
                }
            ],
            open: true
        }
    ];
</script>

<nav>
    <img class="logo" src="./img/Fosshost_Transparent.png" alt="Fosshost Logo" />
    <ul class="sidebar-categories">
        {#each sidebar as category}
            <divider />
            <li class="sidebar-category">
                <span
                    class="sidebar-category-header noselect"
                    on:click={() => {
                        category.open = !category.open;
                    }}
                >
                    {category.header.toUpperCase()}
                    <span class="material-icons dropdown" class:rotate={!category.open}>
                        expand_more
                    </span>
                </span>
                <ul class="sidebar-category-items" class:closed={!category.open}>
                    {#if category.header == 'Projects'}
                        {#if $Projects}
                            {#each $Projects as project}
                                <a
                                    class="sidebar-category-item"
                                    href={`/dashboard/projects/${project._id}`}
                                    use:link
                                    use:active={{
                                        path: new RegExp(
                                            `/dashboard/projects/${project._id}`
                                        ),
                                        className: 'sidebar-item-active'
                                    }}
                                >
                                    <span> {project.name} </span>
                                </a>
                            {/each}
                        {/if}
                        <a
                            class="sidebar-category-item"
                            href={'/dashboard/projects/create'}
                            use:link
                            use:active={{
                                path: '/dashboard/projects/create',
                                className: 'sidebar-item-active'
                            }}
                        >
                            <span class="material-icons project-add-button">add</span>
                            <span class="project-add-button"> New Project </span>
                        </a>
                    {:else}
                        {#each category.items as item}
                            {#if !item.admin || $User.admin}
                                {#if item.route[0] !== '/'}
                                    <a class="sidebar-category-item" href={item.route}>
                                        <span> {item.name} </span>
                                    </a>
                                {:else}
                                    <a
                                        class="sidebar-category-item"
                                        href={item.route}
                                        use:link
                                        use:active={{
                                            path: `${item.route}*`,
                                            className: 'sidebar-item-active'
                                        }}
                                    >
                                        <span> {item.name} </span>
                                    </a>
                                {/if}
                            {/if}
                        {/each}
                    {/if}
                </ul>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        background-color: #0e0d0d;
        width: var(--sidebar-width);
        min-height: 100vh;
        top: 0;
        left: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

    .logo {
        width: calc(var(--sidebar-width) - 22px);
        margin: 25px 0px;
    }

    divider {
        display: block;
        width: calc(var(--sidebar-width) - 50px);
        height: 1px;
        background-color: white;
        opacity: 0.3;
    }

    li,
    ul {
        list-style-type: none;
    }

    .project-add-button {
        opacity: 0.75;
    }

    .sidebar-categories {
        width: calc(var(--sidebar-width) - 50px);
        height: auto;
        color: white;
        margin: 0px;
        padding: 0px;
    }

    .sidebar-category {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    .sidebar-category-header {
        width: auto;
        font-size: 20px;
        font-weight: bold;
        padding: 0px;
        margin: 0px;
        margin-left: 7px;
        margin-top: 15px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .sidebar-category-items {
        font-size: 18px;
        width: 100%;
        margin: 0px;
        padding: 0px;
        padding-left: 25px;
        max-height: 50vh;
        overflow-y: auto;
    }

    .sidebar-category-item {
        width: calc(100% - 25px);
        height: 40px;
        margin: 0px;
        padding: 0px;
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
    }

    .sidebar-category-item span {
        color: white;
        text-decoration: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .dropdown {
        float: right;
    }

    :global(.sidebar-item-active) {
        font-weight: bold;
    }

    :global(.sidebar-item-active)::after {
        content: '';
        width: 200px;
        height: 40px;
        background-color: white;
        opacity: 0.15;
        border-radius: 2px;
        display: block;
        position: absolute;
        left: -25px;
    }

    .rotate {
        transform: rotate(90deg);
    }

    .closed {
        display: none;
    }
</style>
