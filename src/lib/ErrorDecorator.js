import Boom from 'boom'

export default (target, key, descriptor) => {
  const fn = descriptor.value

  descriptor.value = async (request, reply) => {
    try {
      await fn(request, reply)
    } catch (e) {
      reply(Boom.badRequest(e.message))
    }
  }

  return descriptor
}
