<script lang="ts">
    export let options = false;
    export let labels: string[] = [];
    export let baseHref = '';
    export let isResource = false;
    export let state = 0;
    export let params: { project_id: string; page: string } = {
        project_id: '',
        page: ''
    };
</script>

<span class="wrapper">
    <div class="header">
        <span class="title-text-wrap">
            <slot />
            {#if isResource}
                <div class="enabled-tag">
                    <span class:enabled={state == 1} class="enabled-tag-color" />
                    {state == 0 ? 'PROVISIONING' : state == 1 ? 'RUNNING' : 'OFFLINE'}
                </div>
            {/if}
        </span>
        {#if options}
            <div class="button-wrapper">
                {#each labels as label, i}
                    <button
                        class:current={params.page ==
                            label.toLowerCase().replace(/ /g, '') ||
                            (i == 0 && params.page == null)}
                        on:click={() => {
                            window.location.href =
                                baseHref + '/' + label.toLowerCase().replace(/ /g, '');
                        }}>{label}</button
                    >
                {/each}
            </div>
        {/if}
    </div>
    <divider />
</span>

<style>
    span.title-text-wrap {
        display: flex;
        padding-right: 8px;
    }

    div.enabled-tag {
        display: flex;
        background-color: #0e0d0d;
        color: white;
        font-weight: bold;
        font-size: 12px;
        height: 24px;
        align-items: center;
        justify-content: center;
        align-self: center;
        margin-left: 1rem;
        padding: 0px 6px;
    }

    span.enabled-tag-color {
        width: 12px;
        height: 12px;
        margin-right: 6px;
        background-color: #aa1717;
    }

    span.enabled {
        background-color: #74aa17;
    }

    span.wrapper {
        font-weight: bold;
        font-size: 30px;
        margin-left: 25px;
        display: flex;
        flex-direction: column;
    }

    @media only screen and (max-width: 600px) {
        span.wrapper {
            font-size: 18px;
        }

        button {
            font-size: 14px !important;
        }
    }

    divider {
        height: 1px;
        background-color: #0e0d0d;
        width: calc(100% - 25px);
        margin: 0px 0px 4px;
    }

    button {
        border: none;
        background-color: transparent;
        font-family: inherit;
        font-weight: 500;
        font-size: 16px;
        height: 30px;
        margin: 0px;
        margin-bottom: -5px;
        cursor: pointer;
        padding: 0px 8px;
    }

    button.current {
        border-bottom: 5px solid #0e0d0d;
    }

    div.header {
        display: flex;
        width: calc(100% - 25px);
        align-items: center;
        justify-content: space-between;
    }
</style>
