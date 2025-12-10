<script lang="ts">
    const { children } = $props();
</script>

<td>
    <div>
        {@render children?.()}
    </div>
</td>

<style scoped>
    div {
        margin: 0 auto;
    }
</style>