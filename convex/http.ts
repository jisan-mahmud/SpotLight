import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { Webhook } from 'svix'
import { api } from './_generated/api'

const http = httpRouter()

http.route({
    path: '/clerk-webhook',
    method: 'POST',
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
        if (!webhookSecret) {
            throw new Error('Missing webhook secret')
        }

        // Check headers
        const svix_id = request.headers.get('svix-id')
        const svix_signature = request.headers.get('svix-signature')
        const svix_timestamp = request.headers.get('svix-timestamp')

        if (!svix_id || !svix_signature || !svix_timestamp) {
            return new Response("Error occurred -- missing svix headers", {
                status: 400
            })
        }

        const payload = await request.json()
        const body = JSON.stringify(payload)

        const wh = new Webhook(webhookSecret)
        let evt:any;

        try {
            evt = wh.verify(body, {
                'svix-id': svix_id,
                'svix-signature': svix_signature,
                'svix-timestamp': svix_timestamp
            })
        } catch (error) {
            console.error("Webhook verification failed", { error, body, headers: { svix_id, svix_signature, svix_timestamp } });
            return new Response('Error verifying webhook', { status: 400 })
        }

        const eventType = evt.type
        console.warn(evt.data)

        if (eventType === 'user.created') {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data
            const email = email_addresses[0].email_address
            console.warn(email)
            if (!email) {
                return new Response('Email address is missing', { status: 400 })
            }

            const name = `${first_name || ""} ${last_name || ""}`.trim()

            try {
                await ctx.runMutation(api.users.createUser, {
                    email: email,
                    fullname: name,
                    image: image_url,
                    clerkId: id,
                    username: email.split('@')[0]
                })
            } catch (error) {
                console.error("Error creating user", error)
                return new Response('Error creating user', { status: 500 })
            }
        }

        return new Response("Webhook processed successfully", { status: 200 })
    })
})

export default http
