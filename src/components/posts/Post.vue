<template>
    <div class="post my-4">
        <v-card class="mx-auto" outlined>
            <div class="post-header ma-5">
              <v-avatar color="indigo" size="45" class="mx-2">
                <v-icon color="#fff">
                  person  
                </v-icon>
              </v-avatar>
            <span>hotblaze18</span>
            </div>

            <v-card-title>
                Post Title
            </v-card-title>

            <v-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident dignissimos omnis magnam ipsam! Voluptatibus totam ut natus magnam. Et impedit ipsa accusantium tempora dolorem earum eum ex expedita magnam voluptas.
            </v-card-text>

						<div class="post-tags px-2 py-1">
							<v-chip small class="mx-1">Anime</v-chip>
							<v-chip small class="mx-1">Spoiler</v-chip>
						</div>

            <v-card-actions>
                <v-icon medium class="mx-2">arrow_circle_up</v-icon>
                <v-icon medium class="mx-2">arrow_circle_down</v-icon>
                <v-icon medium class="mx-2">comment</v-icon>
								<v-icon medium class="mx-2">assistant_photo</v-icon>
            </v-card-actions>  
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({

    })
}
</script>