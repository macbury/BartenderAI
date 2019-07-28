require_relative './macaroon_intercpetor'

# Hide all gprc stuff and expose dandy api for processing invoices
class Invoices
  attr_reader :certificate_path, :macaroon_path, :node_address

  def initialize(certificate_path:, macaroon_path:, node_address:)
    @certificate_path = certificate_path
    @macaroon_path = macaroon_path
    @node_address = node_address
  end

  def create(title:, amount:)
    invoice_request = Lnrpc::Invoice.new(memo: title, value: amount, private: true)
    invoice = client.add_invoice(invoice_request)
    {
      payment_request: invoice.payment_request,
      r_hash: invoice.r_hash
    }
  end

  def on_settled_invoice(&block)
    operation = -> {
      client.subscribe_invoices(Lnrpc::InvoiceSubscription.new) do |invoice|
        EM.next_tick { block.call(invoice) } if invoice.settled # trigger block on EM thread
      end
    }
    EventMachine.defer(operation) # You should never use defer for forever loops in EM. But I`m lazy so fuck it.
  end

  private

  def credentials
    @credentials ||= GRPC::Core::ChannelCredentials.new(File.read(File.expand_path(certificate_path)))
  end

  def macaroon
    @macaroon ||= File.read(
      File.expand_path(File.expand_path(macaroon_path))
    ).each_byte.map { |b| b.to_s(16).rjust(2,'0') }.join
  end

  def client
    @client ||= Lnrpc::Lightning::Stub.new(
      node_address,
      credentials,
      interceptors: [MacaroonInterceptor.new(macaroon)]
    )
  end
end
